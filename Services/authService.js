const User = require('../Models/userModel');
const { messages } = require('../Config/constants');
const tokenAuth = require('../Middlewares/tokenAuth');
const helper = require('../Helper/helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register =  async function (payload, file) {
    const hashPass = await bcrypt.hash(payload.password, 10);
    const genereatedHash =  tokenAuth.generateHash(payload.email);
    let user = new User ({
        firstName : payload.firstName,
        lastName : payload.lastName,
        email : payload.email,
        avatar : file? file.path : undefined,
        password : hashPass,
        active : genereatedHash,
        role : payload.role ? payload.role : 'user'
    })
    const url = `${process.env.FRONT_URL}/active?hash=${genereatedHash}`;
    // await helper.sendemail(user.email, url);
    await user.save();
    return messages.userSuccessfullyRegistered;
}

const login = async function (payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email : email });
    if (!user){ 
        throw messages.ivalidEmailOrPassword
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword){ 
        throw messages.ivalidEmailOrPassword
    }
    if (user.active !== '1'){
        throw messages.activateAccount;
    }
    let token = tokenAuth.generateAccessToken(user.email, user.role, user._id);
    return  token;
}

const active = async function (payload) {
    const hash = User.findOne({ active : payload });
    const verifyToken = tokenAuth.verify(payload);
    if (!hash || !verifyToken) {
        return messages.incorrectHash;
    }
    await User.findOneAndUpdate( { active : payload }, {$set : { active : '1'} }, { upsert : true}) ;
    return messages.accountActivated;
}

const forgotPassword = async function (payload) {
    const account = await User.findOne ({ email : payload }) 
    if (account) { // && account.active === 1
        const genereatedHash = tokenAuth.generateHash(account.email);
        const url = `${process.env.FRONT_URL}/password?hash=${genereatedHash}`;
        helper.sendemail(account.email, url);
        account.hash = genereatedHash;
        await account.save();

        return messages.activatePasswordLink
    } else {
        throw messages.invalidEmail;
    }              
}

const password = async function (hash){
    const hashUser = jwt.verify(hash, process.env.SECRET_KEY);
    if (hashUser) {
        const user = await User.findOne({ email : hashUser.email });
        if (user) {
            await User.findOneAndUpdate( { hash : hash }, {$set : { hash : '1'} }, { upsert : true}) ;
            return messages.resetIsReady;
        } else {
            throw messages.invalidEmail;
        }
    } else {
        throw messages.incorrectHash;
    }
}

const reset = async function (payload) {
    const { password, confirm, email } = payload;
    const user = await User.findOne({ email: email });
    if (user) {
        if (user.hash === '1') {
        if (password === confirm){
            user.password = await bcrypt.hash(payload.password, 10);
            user.hash = tokenAuth.generateHash(payload.email);
            await user.save();
        } else {
            throw messages.passwordsDontMatch
        }
    }else {
        throw messages.incorrectHash;
    }
    }else {
        throw messages.userNotFound;
    }
    throw messages.passwordChangeSuccess
}

module.exports = {
    register,
    login,
    active,
    forgotPassword,
    password,
    reset
}
const User = require('../Models/userModel');
const { messages } = require('../Config/constants');
const tokenAuth = require('../Middlewares/tokenAuth');
const helper = require('../Helper/helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register =  async function (payload, file) {    
    const email = await User.findOne({ email: payload.email})
    if (email) {
        if (file)
        {
            helper.deleteImage(payload.email, file.path);
            throw new Error(messages.emailAlreadyUsed);
        }
    }

    const hashPass = await bcrypt.hash(payload.password, 10);
    const genereatedHash =  tokenAuth.generateHash(payload.email);
    let user = new User ({
        firstName : payload.firstName,
        lastName : payload.lastName,
        email : payload.email,
        avatar : file? file.path : undefined,
        password : hashPass,
        active : genereatedHash,
    })
    const url = `${process.env.FRONT_URL}/api/auth/active?hash=${genereatedHash}`;
    await helper.sendemail(user.email, url);
    await user.save();
    return messages.userSuccessfullyRegistered;
}

const login = async function (payload) {
    const { email, password } = payload;
    const user = await User.findOne({ email : email });
    if (!user){ 
        throw new Error(messages.invalidEmailOrPassword);
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword){
        throw new Error(messages.invalidEmailOrPassword)
    }

    if (user.active !== '1'){
        throw new Error(messages.activateAccount);
    }
    let token = tokenAuth.generateAccessToken(user.email, user.role, user._id);
    return  token;
}

const active = async function (payload) {
    const hash = await User.findOne({ active : payload });
    const verifyToken = tokenAuth.verify(payload);
    if (!hash || !verifyToken) {
        throw new Error(messages.incorrectHash);
    }
    await User.findOneAndUpdate( { active : payload }, {$set : { active : '1'} }, { upsert : true}) ;
    return messages.accountActivated;
}

const forgotPassword = async function (email) {
    const account = await User.findOne ({ email : email }) 
    if (account && account.active === 1) {  
        const genereatedHash = tokenAuth.generateHash(account.email);
        const url = `${process.env.FRONT_URL}/api/auth/resetPassword?hash=${genereatedHash}`;
        helper.sendemail(account.email, url);
        account.hash = genereatedHash;
        
        await account.save();
        return messages.activatePasswordLink;
    } else {
        throw new Error (messages.invalidEmail);
    }              
}

const resetPassword = async function (payload, hash){    
    const user = await User.findOne ({ hash : hash });
    if (!user) {
        throw new Error (messages.userNotFound);
    }

    const hashUser = jwt.verify(hash, process.env.SECRET_KEY);
    if (!hashUser) {
        throw new Error (messages.incorrectHash);
    }
        
    const update_user = await User.findOne({ email : hashUser.email });
    if (!update_user) {
        throw new Error (messages.invalidEmail);
    }

    const { password, confirm } = payload;
    if (password !== confirm) {
        throw new Error (messages.passwordsDontMatch)
    }

    user.password = await bcrypt.hash(payload.password, 10);
    user.hash = '';
    await user.save();
    return  messages.passwordChangeSuccess;
}

module.exports = {
    register,
    login,
    active,
    forgotPassword,
    resetPassword,
}
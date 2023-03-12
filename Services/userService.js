const User = require('../Models/userModel');
const { messages } = require('../Config/constants');
const helper = require('../Helper/helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllUsersData = async function () {
    const users = await User.find().select('-password');
    const userMap = {};
    users.forEach((user) => {
            if (user.role !== 'admin'){
                if (user.avatar !== undefined){
                    const image = user.avatar.split('/')[1];
                    user.avatar = process.env.FRONT_URL + '/api/users/image/' +  image;
                }
                userMap[user._id] = user;
            }
    });
    return userMap;
}

const getSingleUserData = async function (id) {
    const user = await User.findById({_id : id }).select('-password');
    if (!user) {
        throw new Error (messages.userNotFound);
    }
    if (user.avatar !== undefined) {
        const image = user.avatar.split('/')[1];
        user.avatar = process.env.FRONT_URL + '/api/users/image/' +  image;
    }
    return user;
}

const updateUserData = async function (token, id, payload, file) {
    if (!token) {
        throw new Error(messages.loginForInformation)
    }
    const user_token = jwt.verify(
        token.split(' ')[1],
        process.env.ACCESS_TOKEN_SECRET
    )
    if (user_token._id !== id) {
        throw new Error(messages.notAllowed)
    } 

    const user = await User.findOne({ _id : id });
    if(!user) {
        throw new Error (messages.invalidId);
    }
    if (file){
        if (user.avatar !== undefined){
            helper.deleteImage(user.email, user.avatar);
        }
    }
    const updateUser = {
        firstName : payload.firstName ? payload.firstName : user.firstName,
        lastName : payload.lastName ? payload.lastName : user.lastName,
        email : payload.email ? payload.email : user.email,
        avatar : file ? file.path : undefined
    };
    await User.findByIdAndUpdate({_id : id }, {$set : updateUser}, { upsert: true });    
    return await User.findById({ _id : id}).select('-password').select('role'); 
}

const changePassword = async function (token, id, payload){
    if (!token) {
        throw new Error (messages.notAllowed)
    }
    const user = await User.findById({ _id : id });
    if (!user) {
        throw new Error(messages.invalidId);
    }
    const token_verify = jwt.verify(
        token.split(' ')[1],
        process.env.ACCESS_TOKEN_SECRET
    )
    if (!token_verify) {
        throw new Error (messages.incorrectHash);
    }

    const { password, newPassword, confirm } = payload;
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword){
        throw new Error (messages.invalidEmailOrPassword)
    }
    if (newPassword !== confirm) {
        throw new Error (messages.passwordsDontMatch);
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    return  messages.passwordChangeSuccess
}

module.exports = {
    getAllUsersData,
    getSingleUserData,
    updateUserData,
    changePassword
}

const User = require('../Models/userModel');
const { messages } = require('../Config/constants');
const helper = require('../Helper/helper');


const getAllUsers = async function () {
    const users = await User.find().select('-password');
    const userMap = {};
    users.forEach((user) => {
            if (user.role !== 'admin'){
                const image = user.avatar.split('/')[1];
                user.avatar = process.env.FRONT_URL + '/' +  image;
                userMap[user._id] = user;
            }
    });
    return userMap;
}

const singleUser = async function (id) {
    const user = await User.findById(id).select('-password')
    if (!user) {
        return messages.userNotFound;
    }
    return user;
}

const update = async function (payload, file) {
    if (file){
        const user_avatar_path = await User.findOne({ _id : payload.id });
        if (user_avatar_path.avatar){
            helper.deleteImage(user_avatar_path.avatar);
        }
    }
    const updateedUserId = payload.id;
    const updateUser = {
        firstName : payload.firstName,
        lastName : payload.lastName,
        email : payload.email,
        avatar : file ? file.path : undefined
    };
    const success = await  User.findByIdAndUpdate({_id : updateedUserId }, {$set : updateUser}, { upsert: true }).select('-password');
    if (success) {
        return messages.userUpdatedSuccessfully;
    } else {
        return null;
    }
}

module.exports = {
    getAllUsers,
    singleUser,
    update,
}

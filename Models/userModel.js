const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);
const Role = Object.freeze({
    Admin : 'admin',
    User : 'user'
});

const userSchema = new Schema({
    firstName : {
        type : String,
        required : true,
    },
    lastName : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type: String,
        required : true
    },
    role : {
       type : String,
       enum : Object.values(Role),
       default : Role.User,
    },
    avatar : {
        type : String,
    },
    active : {
        type : String,
    },
    hash : {
        type : String,
    }

});

module.exports = mongoose.model('users', userSchema);
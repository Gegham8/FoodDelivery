// anun chap gin qanak
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const foodSchema = new Schema ({
    name : {
        type : String,
        required : true
    },
    size : {
        type : String,
        required : true
    },
    price : {
        type : String,
        required : true
    },
    quantity : {
        type : String
    },
    avatar : {
        type : String
    }
});

module.exports = mongoose.model('food', foodSchema);



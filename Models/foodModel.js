const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);

const foodSchema = new Schema ({
    name : {
        type : String,
        required : true,
        unique : true
    },
    size : {
        type : String,
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
    },
    category : {
        type : String,
        required : true
    }
});

module.exports = mongoose.model('food', foodSchema);



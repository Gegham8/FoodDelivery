const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.set('strictQuery', false);


const categorySchema = new Schema ({
    name : {
        type : String,
        unique : true
    },
    products : [{
        type : Schema.Types.ObjectId,
        ref : 'food'
    }]
})

module.exports = mongoose.model('category', categorySchema);
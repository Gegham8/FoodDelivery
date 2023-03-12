const path = require('path');
const multer = require('multer');
const db = require('../Models/foodModel');

let storage = multer.diskStorage({
    destination : function(req, res, cb){
        cb(null, 'FoodPic/')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
})

let foodUpload = multer({
    storage : storage,
    fileFilter : function(req, file, cb){
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png' 
        ){
            cb(null,true);
        }else {
            return cb(new Error('Only jpg, png, jpeg files are supported'));    
        }
    },
        limits : {
            fileSize : 1024 * 1024 * 2
        }
})

module.exports = foodUpload;
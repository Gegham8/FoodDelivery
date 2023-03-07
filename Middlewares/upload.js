const path = require('path');
const multer = require('multer');
const db = require('../Models/userModel');

let storage = multer.diskStorage({
    destination : function(req, res, cb){
        cb(null, 'Uploads/')
    },
    filename: function(req, file, cb){
        let ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
})

let upload = multer({
    storage : storage,
    fileFilter : function(req, file, cb){
        if (
            file.mimetype == 'image/jpeg' ||
            file.mimetype == 'image/jpg' ||
            file.mimetype == 'image/png' 
        ){
            cb(null,true);
        }else {
            console.log('Only jpg, png, jpeg files are supported') // poxel vor res.send ani 
            cb(null,false);
        }
    },
        limits : {
            fileSize : 1024 * 1024 * 2
        }
})

module.exports = upload;
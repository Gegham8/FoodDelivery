const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const registerVerify = require('../Middlewares/signUp');
const helper = require('../Helper/helper') 
const multer = require('multer');
const myMulter = require('../Middlewares/upload');
const upload = myMulter.single('avatar');

router.post('/register', 
    function(req, res, next) { 
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            helper.deleteImage(req.file, req.file.path);
            return res.json ({message : err.message});
        } else if (err) {
            return  res.json({ message : err.message });
        }
        next();
    })
},
    registerVerify.userValidation,
    registerVerify.validate,
    authController.register,
)

router.post('/login', 
    authController.login,
);

router.get('/active',  
    authController.active
);

router.post('/forgot', 
    authController.forgotPassword
)

router.get('/resetpassword',
    registerVerify.passwordValidation,
    registerVerify.validate,
    authController.resetPassword
)

module.exports = router
const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const upload = require('../Middlewares/upload');
const helper = require('../Helper/helper');
const registerVerify = require('../Middlewares/signUp');

router.post('/register', 
    upload.single('avatar'),
    helper.dublicateEmail,
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

router.get('/password',
    authController.password
)

router.post('/reset',
    registerVerify.passwordValidation,
    registerVerify.validate,
    authController.reset
)


module.exports = router
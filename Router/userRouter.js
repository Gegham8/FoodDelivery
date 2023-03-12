const express = require('express');
const router = express.Router();
const UserController = require('../Controller/userController');
const { authCheck } = require('../Middlewares/userCheck');
const registerVerify = require('../Middlewares/signUp');
const { isAdmin } = require('../Middlewares/isAdmin');
const multer = require('multer');
const myMulter = require('../Middlewares/foodupload');
const upload = myMulter.single('avatar');

router.get('/',
    isAdmin,
    UserController.getAllUsersData
);

router.get('/:id',
    authCheck,
    UserController.getSingleUserData
)

router.patch('/:id',
    function(req, res, next) { 
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            helper.deleteImage(req.file, req.file.path);
            return res.json ({ message : err.message });
        } else if (err) {
            return  res.json({ message : err.message });
        }
        next();
    })
},
    UserController.updateUserData
)
router.patch('/changepassword/:id',
    registerVerify.passwordValidation,
    registerVerify.validate,
    UserController.changePassword
)

router.get('/image/:image', (req, res) => {
    res.sendFile(req.params.image, { root:"Uploads" });
})

module.exports = router;
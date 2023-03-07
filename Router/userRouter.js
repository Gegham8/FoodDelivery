const express = require('express');
const router = express.Router();
const UserController = require('../Controller/userController');
const upload = require('../Middlewares/upload');
const { authCheck } = require('../Middlewares/userCheck');
const helper = require('../Helper/helper');


router.get('/users',
    helper.isAdmin,
    UserController.getAllUsers
);

router.get('/users/:id',
    authCheck,
    UserController.singleUser
)

router.post('/update',
    upload.single('avatar'),
    UserController.update
)

router.get('/', (req, res) => {
    res.sendFile(req.query.image, { root:"." });
})

module.exports = router;
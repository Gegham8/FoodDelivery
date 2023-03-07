const express = require('express');
const router = express.Router();
const foodController = require('../Controller/foodController');
const upload = require('../Middlewares/upload');
const helper = require('../Helper/helper');
const registerVerify = require('../Middlewares/signUp');
const foodUpload = require('../Middlewares/foodupload');

router.post('/food/add',
    foodUpload.single('avatar'),
    foodController.add
)

router.get('/food',
    foodController.getAllFoods
)

router.get('/food/:id',
    foodController.singleFood
)

router.post('/food/update', 
    foodUpload.single('avatar'),
    foodController.updateFood
)

router.get('/', (req, res) => {
    res.sendFile(req.query.image, { root:"." });
})


module.exports = router;
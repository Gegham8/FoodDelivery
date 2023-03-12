const express = require('express');
const router = express.Router();
const foodController = require('../Controller/foodController');
const helper = require('../Helper/helper');
const { isAdmin } = require('../Middlewares/isAdmin');
const { authCheck } = require('../Middlewares/userCheck');
const multer = require('multer');
const myMulter = require('../Middlewares/foodupload');
const foodUpload = myMulter.single('avatar');

router.post('/add',
    function(req, res, next) { 
    foodUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            helper.deleteImage(req.file, req.file.path);
            return res.json ({ message : err.message });
        } else if (err) {
            return  res.json({ message : err.message });
        }
        next();
    })
},
    isAdmin,
    foodController.addFoodData
)

router.get('/',
    authCheck,
    foodController.getAllFoods
)

router.get('/:id',
    authCheck,
    foodController.singleFood
)

router.patch('/:id', 
function(req, res, next) { 
    foodUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            helper.deleteImage(req.file, req.file.path);
            return res.json ({ message : err.message });
        } else if (err) {
            return  res.json({ message : err.message });
        }
        next();
    })
},
    isAdmin,
    foodController.updateFoodData
)

router.delete('/:id',
    isAdmin,
    foodController.deleteFoodData
)


router.get('/image/:image', (req, res) => {
    res.sendFile(req.params.image, { root:"FoodPic" });
})


module.exports = router;
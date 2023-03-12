const express = require('express');
const router = express.Router();
const categoryController = require('../Controller/categoryController');
const { authCheck } = require('../Middlewares/userCheck');
const { isAdmin } = require('../Middlewares/isAdmin');

router.post('/add',
    isAdmin,
    categoryController.addCategoryData
)

router.get('/', 
    authCheck,
    categoryController.getAllCategoryData
)

router.get('/:id',
    authCheck,
    categoryController.getSingleCategory
)

router.put('/:id',
    isAdmin, 
    categoryController.updateCategory
)

router.delete('/:id',
    isAdmin,
    categoryController.deleteCategory
)

module.exports = router;
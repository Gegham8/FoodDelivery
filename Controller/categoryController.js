const categoryService = require('../Services/categoryService');
require('dotenv').config();


const getAllCategoryData = async function (req, res) {
    try {
        res.send (await categoryService.getAllCategoryData())
    } catch (e) {
        res.json( { message : e.message })
    }
}

const getSingleCategory = async function (req, res) {
    try {
        res.send (await categoryService.getSingleCategory(req.params.id))
    } catch (e) {
        res.json( { message : e.message })
    }
}

const addCategoryData = async function (req, res) {
    try {
        res.send (await categoryService.addCategory (req.body))
    } catch (e) {
        res.json( { message : e })
    }
}

const updateCategory  = async (req, res) => {
    try {
        res.send (await categoryService.updateCategory (req.params.id, req.body))
    } catch (e) {
        res.json( { message : e.message })
    }
}

const deleteCategory = async function (req, res) {
    try {
        res.send (await categoryService.deleteCategory (req.params.id))
    } catch (e) {
        res.json( { message : e.message })
    }
}

module.exports = {
    getAllCategoryData,
    getSingleCategory,
    addCategoryData,
    updateCategory,
    deleteCategory
}
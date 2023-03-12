const foodService = require('../Services/foodService');
const helper = require('../Helper/helper');
require('dotenv').config();


const addFoodData = async function (req, res) {
    try {
        res.send (await foodService.addFoodData(req.body, req.file));
    } catch(e) {
        if (req.file) {
            helper.deleteImage(req.body.email, req.file.path)
        }
        res.json({ message : e.message })
    }
}
const getAllFoods = async function(req, res) {
    try {
        console.log(req.body)
        res.send (await foodService.getAllFoods());
    } catch(e) {
        res.json( { message : e.message })
    }
}

const singleFood = async function (req, res) {
    try {
        res.send (await foodService.singleFoodData(req.params.id));
    } catch(e) {
        res.json( { message : e.message })
    }
}
const updateFoodData = async function (req, res) {
    try {
        res.send (await foodService.updateFoodData(req.params.id, req.body, req.file))
    } catch (e) {
        if (req.file){
            helper.deleteImage(req.body.email, req.file.path);
        }
        res.json( { message : e.message })
    }
}

const deleteFoodData = async function (req, res) {
    try {
        res.send (await foodService.deleteFoodData(req.params.id))
    } catch (e) {
        res.json( { message : e.message })
    }
}

module.exports = {
    addFoodData,
    singleFood,
    getAllFoods,
    updateFoodData,
    deleteFoodData
}
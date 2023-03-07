const foodService = require('../Services/foodService');
const config = require('../Config/constants');
const helper = require('../Helper/helper');
require('dotenv').config();


const add = async function (req, res) {
    try{
        res.send (await foodService.add(req.body, req.file));
    }catch(e){
        if (req.file){
            helper.deleteImage(req.file.path)
        }
        res.json({ message : e})
    }
}
const getAllFoods = async function(req, res) {
    try {
        res.send (await foodService.getAllFoods());
    }catch(e) {
        res.json( { message : e})
    }
}

const singleFood = async function (req, res) {
    try {
        res.send (await foodService.singleFood(req.params.id));
    }catch(e) {
        res.json( { message : e })
    }
}
const updateFood = async function (req, res) {
    try {
        console.log('ste');
        res.send (await foodService.updateFood(req.body, req.file))
    }catch (e) {
        if (req.file){
            helper.deleteImage(req.file.path)
        }
        res.json( { message : e })
    }

}

module.exports = {
    add,
    singleFood,
    getAllFoods,
    updateFood,
}
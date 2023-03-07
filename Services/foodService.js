const Food = require('../Models/foodModel');
const { messages } = require('../Config/constants');
const tokenAuth = require('../Middlewares/tokenAuth');
const helper = require('../Helper/helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const add = async function (payload, file) {
    const { name , size, price, quantity} = payload;
    const newFood = new Food ({
        name : name,
        size : size,
        price : price,
        quantity : quantity,
        avatar : file ? file.path : undefined
    });
    await newFood.save();
    return messages.foodAddSuccess;
}

const getAllFoods = async function () {
    const foods = await Food.find();
    if (foods.length > 0) {
        foods.map(food => {
            food.avatar = process.env.FRONT_URL + '/' +  food.avatar.split('/')[1];
        })
        return foods;
    } 
    return messages.noFoodExists;
}

const singleFood = async function (id) {
    const food = await Food.findById({ _id : id });
    if (food) {
        return food;
    }
    return messages.noFoodExists;
}

const updateFood = async function (payload, file) {
    if(file) {
        const food_avatar = await Food.findOne({ _id : payload.id });
        if (food_avatar.avatar){
            helper.deleteImage(food_avatar.avatar);
        }
    }
    const new_food = {
        name : payload.name,
        size : payload.size,
        price : payload.price,
        quantity : payload.quantity,
        avatar : file ? file.path : undefined
    }
    const updated_food = await  Food.findByIdAndUpdate({_id : payload.id }, {$set : new_food}, { upsert: true });

    return updated_food.name + messages.foodUpdatedSuccess;
}


module.exports = {
    getAllFoods,
    singleFood,
    add,
    updateFood
}
const Food = require('../Models/foodModel');
const Category = require('../Models/categoryModel');
const { messages } = require('../Config/constants');
const helper = require('../Helper/helper');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const addFoodData = async function (payload, file) {
    const { name, size, price, quantity } = payload;
    const category = await Category.findOne({ name: payload.category });
    if (!category){
       throw new Error(messages.pleaseFirstAddCategory);
    }

    const newFood = new Food ({
        name : name,
        size : size,
        price : price,
        quantity : quantity,
        avatar : file ? file.path : undefined,
        category : payload.category
    });
    await newFood.save();
    category.products.push(newFood);
    
    await category.save();
    return messages.foodAddSuccess;
}

const getAllFoods = async function () {
    const foods = await Food.find();
    if (foods.length <= 0) {
        throw new Error(messages.noFoodExists);
    }
    foods.map(food => {
        if (food.avatar !== undefined) {
            food.avatar = process.env.FRONT_URL + '/api/foods/image/' +  food.avatar.split('/')[1];
        }
    })
    return foods;
} 

const singleFoodData = async function (id) {
    const food = await Food.findById({ _id : id });
    if (!food) {
        throw new Error(messages.noFoodExists);
    }
    if (food.avatar !== undefined) {
        food.avatar = process.env.FRONT_URL + '/api/foods/image/' +  food.avatar.split('/')[1];
    }
    return food;    
}

const updateFoodData = async function (id, payload, file) {
    const food = await Food.findOne({ _id : id });
    if (!food) {
        throw new Error(messages.invalidId);
    }
    if(file) {
        if (food.avatar){
            helper.deleteImage(food.avatar);
        }
    }
    const new_food = {
        name : payload.name ? payload.name : food.name,
        size : payload.size ? payload.size : food.size,
        price : payload.price ? payload.price : food.price,
        quantity : payload.quantity ? payload.quantity : food.quantity,
        avatar : file ? file.path : undefined
    }

    await Food.findByIdAndUpdate({ _id : id }, { $set : new_food }, { upsert: true });
    return await Food.findById({ _id : id });
}

const deleteFoodData = async function (food_id) {
    const food = await Food.findById({ _id : food_id });
    if (!food){
        throw new Error (messages.invalidId)
    }

    const delete_food = await Category.findOne({ name : food.category });
    if (delete_food){
        const idx = delete_food.products ? delete_food.products.indexOf(food_id) : -1;
        if (idx !== -1){
            delete_food.products.splice(idx, 1);
            await delete_food.save();
        }
    }
    await Food.deleteOne({ _id: food_id });   
    return messages.foodDeletedSuccess;
}


module.exports = {
    getAllFoods,
    singleFoodData,
    addFoodData,
    updateFoodData,
    deleteFoodData
}
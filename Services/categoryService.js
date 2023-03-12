const Category = require('../Models/categoryModel');
const { messages } = require('../Config/constants');
require('dotenv').config();

const getAllCategoryData = async function() {
    const category = await Category.find();
    if (category.length <= 0) {
        throw new Error (messages.noCategoryExists);
    }
    category.map(element => {
        category._id = element;
    })
    return category;
}
const getSingleCategory = async function (id){
    const category = await Category.findById({ _id : id });
    if (!category) {
        throw new Error (messages.invalidId);
    }
    return category;
}

const addCategory = async function (payload) {
    const name = await Category.findOne({ name : payload.name });
    if (name) {
        throw new Error (messages.categoryAlreadyExists);
    }
    const category = new Category ({
        name : payload.name
    });

    await category.save();
    return messages.categoryAddSuccess;
}

const updateCategory = async function (id, payload) {
    const category = await Category.findById( { _id : id });
    if (!category) {
        throw new Error(messages.invalidId);
    }
    const new_category = {
        name : payload.name ? payload.name : category.name, 
    }
    await Category.findByIdAndUpdate({ _id : id }, { $set : new_category }, { upsert: true });
    return await Category.findById({ _id : id });
}

const deleteCategory = async function (id) {
    const category = await Category.findById({ _id : id });
    if (!category){
        throw new Error(messages.invalidId)
    }
    await Category.deleteOne({ _id: id });
    return messages.categoryDeletedSuccess;
}

module.exports = {
    getAllCategoryData,
    getSingleCategory,
    addCategory,
    updateCategory,
    deleteCategory
}
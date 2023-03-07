const config = require('../Config/constants');
require('dotenv').config();
const userService = require('../Services/userService');
const helper = require('../Helper/helper');

const getAllUsers = async function (req, res) {
    try {
        res.send(await userService.getAllUsers())
    }catch(e) {
        res.status(config.statusCode.conflict).send({ message: e.message });
    }
}

const singleUser = async function (req, res) {
    try {
        res.send(await userService.singleUser(req.params.id))
    }catch(e) {
        res.status(config.statusCode.conflict).send({ message: e.message });
    }
}

const update = async function (req, res) {
    try {
        res.send( await userService.update(req.body, req.file));
    }catch (e) {
        res.status(config.statusCode.conflict).send({ message: e });
    }
}

module.exports = {
    getAllUsers,
    singleUser,
    update
};
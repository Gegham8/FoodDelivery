const config = require('../Config/constants');
const userService = require('../Services/userService');

const getAllUsersData = async function (req, res) {
    try {
        res.send(await userService.getAllUsersData())
    } catch(e) {
        res.status(config.statusCode.conflict).send({ message: e.message });
    }
}

const getSingleUserData = async function (req, res) {
    try {
        res.send(await userService.getSingleUserData(req.params.id))
    } catch(e) {
        res.status(config.statusCode.conflict).send({ message: e.message });
    }
}

const updateUserData = async function (req, res) {
    try {
        res.send( await userService.updateUserData(req.headers.authorization, req.params.id, req.body, req.file));
    } catch (e) {
        res.status(config.statusCode.conflict).send({ message: e.message });
    }
}

const changePassword = async function (req, res) {
    try {
        res.send( await userService.changePassword(req.headers.authorization,req.params.id,  req.body));
    } catch (e) {
        res.status(config.statusCode.conflict).send({ message: e.message });
    }
}

module.exports = {
    getAllUsersData,
    getSingleUserData,
    updateUserData,
    changePassword
};
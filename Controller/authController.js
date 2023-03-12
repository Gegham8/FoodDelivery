const authService = require('../Services/authService');
const config = require('../Config/constants');
const helper = require('../Helper/helper');
require('dotenv').config();

const register =  async function(req, res) { 
    try {
        res.send(await authService.register(req.body, req.file))
    } catch(e) {
        if (req.file) {
            await helper.deleteImage(req.body.email, req.file.path);    
        }
        res.status(e.httpStatus || config.statusCode.notFound).send({ message: e.message || '' });
    }
}

const login = async function (req, res) {
    try {
        res.send(await authService.login(req.body))
    }catch(e) {
        res.status(e.httpStatus || config.statusCode.notFound).send({ message: e.message });
    }
}

const active = async function (req, res) {
    try {
        res.send (await authService.active(req.query.hash))
    } catch(e) {
        res.status (config.statusCode.unauthorized).send({ message : config.messages.unauthorized })
    }
}

const forgotPassword = async function (req, res) {
    try {
        res.send (await authService.forgotPassword(req.body.email));
    } catch(e) {
        res.status (config.statusCode.badRequest).send({ message : e.message })
    }
}

const resetPassword = async function (req, res) {
    try {
        res.send (await authService.resetPassword(req.body, req.query.hash))
    } catch(e) {
        res.status (config.statusCode.badRequest).send({ message : e.message })
    }
}

module.exports = {
    register,
    login,
    active,
    forgotPassword,
    resetPassword
}
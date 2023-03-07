const authService = require('../Services/authService');
const config = require('../Config/constants');
const helper = require('../Helper/helper');
require('dotenv').config();



const register =  async function(req, res) { 
    try {
        res.send(await authService.register(req.body, req.file))
    }catch(e) {
        res.status(e.httpStatus || config.statusCode.notFound).send({ message: e.message || '' });
        helper.deleteImage(req.file.path);    
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
        res.status (config.statusCode.badRequest).send({ message : e })
    }
}

const password = async function (req, res) {
    try {
        res.send (await authService.password(req.query.hash))
    } catch(e) {
        res.status (config.statusCode.badRequest).send({ message : e })
    }
}

const reset = async function (req, res) {
    try {
        res.send (await authService.reset(req.body))
    } catch {
        res.status (config.statusCode.badRequest).send({ message : e })
    }
}

module.exports = {
    register,
    login,
    active,
    forgotPassword,
    password,
    reset
}
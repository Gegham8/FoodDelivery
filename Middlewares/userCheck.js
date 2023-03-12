const User = require('../Models/userModel');
const config  = require('../Config/constants');
const jwt = require('jsonwebtoken');
const helper = require('../Helper/helper');
require('dotenv').config();

async function authCheck(req, res, next) {
try{
        if (!req.headers.authorization){
            return res.send(config.messages.loginForInformation)
        }

    const user = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.ACCESS_TOKEN_SECRET
    )
    if (!user) {
        return res.send(config.messages.notAllowed)
    }
    next();
    } catch(e) {
            return res.status(config.statusCode.unauthorized).json({ message : config.messages.unauthorized });
        }
}

module.exports = {
    authCheck
}
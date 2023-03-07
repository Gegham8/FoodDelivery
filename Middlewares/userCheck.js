const User = require('../Models/userModel');
const config  = require('../Config/constants');
const jwt = require('jsonwebtoken');
const helper = require('../Helper/helper');


async function authCheck(req, res, next) {
    try{
        if (req.headers.authorization){
            const user = jwt.verify(
                req.headers.authorization.split(' ')[1],
                process.env.ACCESS_TOKEN_SECRET
            )
            if (user && (user.role === 'admin' || user._id === req.params.id)){
                next();
            } else {
                res.send(config.messages.notAllowed)
            }
        } else {
            res.send(config.messages.loginForInformation)
        }
    }catch(e){
        res.status(config.statusCode.unauthorized).json({ message : config.messages.unauthorized });
    }
}

module.exports = {
    authCheck
}
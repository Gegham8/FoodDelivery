const jwt = require('jsonwebtoken');
const config = require('../Config/constants')
require('dotenv').config();

async function isAdmin (req, res, next) {
try {
    if (!req.headers.authorization) {
        res.send (config.messages.loginForInformation)
    }
    const user = jwt.verify(
        req.headers.authorization.split(' ')[1],
        process.env.ACCESS_TOKEN_SECRET
    )
    if (user && user.role === 'admin') {
        next();
    } else {
        res.send(config.messages.notAllowed)
    }
}  catch(err) {
        res.status(config.statusCode.unauthorized).json({ message : config.messages.unauthorized });
    }
}

module.exports = {
    isAdmin
}
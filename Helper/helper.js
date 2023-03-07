const User = require('../Models/userModel');
const nodemailer = require('nodemailer');
const config = require('../Config/constants')
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function isAdmin (req, res, next) {
    try {
    if (req.headers.authorization) {
        const user = jwt.verify(
            req.headers.authorization.split(' ')[1],
            process.env.ACCESS_TOKEN_SECRET
        )
        if (user && user.role === 'admin') {
            next();
        }else {
            res.send(config.messages.notAllowed)
        }
    }else {
        res.send(config.messages.loginForInformation)
    }} catch(err) {
        res.status(config.statusCode.unauthorized).json({ message : config.messages.unauthorized });
    }
}

const sendemail = async (payload, url) => {
    const transporter =  {
            host : process.env.EMAIL_HOST,
            port : 587,
            secure : false,
            auth : {
                user : process.env.EMAIL_ADDRESS,
                pass : process.env.EMAIL_PASSWORD
        }
    }
    const activateLink = url;
    const code = nodemailer.createTransport(transporter);
    let mailDetails = {
        from: process.env.EMAIL_ADDRESS,
        to: payload,
        subject: 'Test',
        text: activateLink
    };
    code.sendMail(mailDetails, err => {
        if (err) {
            throw err;
        }else {
            console.log('gnac');
        }
     });
}

async function deleteImage(imagePath){
    fs.unlinkSync(path.join(__dirname,'../', imagePath));
}

const dublicateEmail =  async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });
    if (user){ 
        if (req.file){
            await deleteImage(req.file.path);
        }
        res.status(config.statusCode.conflict).json({ error : config.messages.emailAlreadyUsed }); 
    }else {
        next();
    }
}

module.exports = {
    sendemail,
    isAdmin,
    dublicateEmail,
    deleteImage
}
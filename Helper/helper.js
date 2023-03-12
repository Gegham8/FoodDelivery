const User = require('../Models/userModel');
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

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
            throw new Error(err);
        }
     });
}

async function deleteImage(email, imagePath){
    const user = await User.findOne({ email: email });
    if (user && (user.avatar !== undefined) && (fs.existsSync(imagePath))) {
        fs.unlinkSync(path.join(__dirname,'../', imagePath));
    }
}


module.exports = {
    sendemail,
    deleteImage
}
const  { check, validationResult } = require('express-validator');
const config = require('../Config/constants');
const path = require('path');
const { deleteImage } = require('../Helper/helper');

const passwordValidation = [
  check('password')
  .isStrongPassword({
    minLength: 8,
    minLowercase : 1,
    minUppercase : 1,
    minNumbers : 1
  })
  .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one symbol")
]

const userValidation = [
  check('firstName')
  .isLength({ min : 3 })
  .withMessage("Firstname must have minimum length of 3" ),

  check('email')
  .isEmail()
  .withMessage(config.messages.invalidEmail)
  .normalizeEmail(),

  check('password')
  .isStrongPassword({
    minLength: 8,
    minLowercase : 1,
    minUppercase : 1,
    minNumbers : 1
  })
  .withMessage("Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter,one number and one symbol")
];
  
const validate = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()){
    if (req.file){
      deleteImage(req.file.path)
    }
    res.status(422).json({ success : false , error : error.array() } );
  } else {
    next();
  }
}
  
module.exports =  {
    userValidation,
    passwordValidation,
    validate,
};
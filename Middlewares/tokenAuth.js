const jwt = require('jsonwebtoken');
require('dotenv').config();

function generateAccessToken(email, role, id) {
    return jwt.sign( { email : email, role : role , _id : id }, process.env.ACCESS_TOKEN_SECRET);
}

function generateHash (email) {
  return jwt.sign({ email : email }, process.env.SECRET_KEY, {
    expiresIn : '2d'
  });
}

function verify (token){
  const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
  return verifyToken;
}

module.exports = {
  generateAccessToken,
  generateHash,
  verify
}
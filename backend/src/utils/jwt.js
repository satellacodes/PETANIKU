const jwt = require("jsonwebtoken");
require('dotenv').config();

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const verifyToken = (token) => {
 try {
  return jwt.verify(token, process.env.JWT_SECRET);
 } catch (error) {
 
 //if (error.name === 'TokenExpiredError') {
//      return jwt.decode(token);
 //   }
    throw error;
 }
};

module.exports = {
  generateToken,
  verifyToken,
};

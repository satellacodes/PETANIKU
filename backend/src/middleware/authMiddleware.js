const jwt = require("../utils/jwt");
const { User } = require("../models");

exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({
      message: "Not authorized to access this resource",
    });
  }

  try {
    const decoded = jwt.verifyToken(token);
    console.log('Decoded token:', decoded);
    
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Auth error:', error);

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ code: "TOKEN_EXPIRED", message: "Token expired, please refresh" });
    }
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ code: "AUTH_ERROR", message: "Invalid token", error: error.message });
    }
    
    return res.status(401).json({ code: "AUTH_ERROR", message: "Not authorized", error: error.message });
  }
};


exports.role = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
       console.error(`User role ${req.user.role} not authorized`);
      return res.status(403).json({
        message: `User role ${req.user.role} is not authorized to access this resource`,
      });
    }
    next();
  };
};

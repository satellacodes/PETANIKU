const jwt = require("../utils/jwt");
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { name, email, phone, password, role, location, description } =
      req.body;

    const userExists = await User.findOne({ where: { email } });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role,
      location,
      description: role === "farmer" ? description : null,
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: jwt.generateToken(user.id),
    });
  } catch (error) {
    console.error("Registration error",error);
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: jwt.generateToken(user.id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Authorization token required' });
    }

    const decoded = jwt.verifyToken(token);
    
     if (!decoded || !decoded.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user = await User.findByPk(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    const newToken = jwt.generateToken(user.id);

    res.json({ 
      token: newToken,
      expiresIn: '1h'
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ 
      message: 'Invalid or expired token',
      error: error.message 
    });
  }
};

exports.getProfile = async (req, res) => {
  try {

    const user = req.user;

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role,
      location: user.location,
      description: user.description,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

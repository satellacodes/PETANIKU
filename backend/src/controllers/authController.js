const jwt = require("../utils/jwt");
const User = require("../models/User");

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

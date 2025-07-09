const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

exports.register = async (req, res) => {
  const { name, email, password, flatCode } = req.body;
  try {
    const user = await User.create({ name, email, password, flatCode });
    const token = generateToken(user._id);
    res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ error: 'User already exists or invalid data' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    const token = generateToken(user._id);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};

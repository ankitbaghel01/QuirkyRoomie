const punishments = [
  "You’re making chai for everyone for a week.",
  "You owe everyone samosas.",
  "You’re doing dishes for 3 days.",
  "Movie night snacks are on you!",
];

module.exports = () => punishments[Math.floor(Math.random() * punishments.length)];

// File: routes/authRoutes.js
const express = require('express');
const { register, login } = require('../controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);

module.exports = router;

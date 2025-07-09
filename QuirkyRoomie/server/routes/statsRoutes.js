const express = require('express');
const protect = require('../middleware/authMiddleware');
const { getLeaderboard, getStats } = require('../controllers/statsController');
const router = express.Router();

router.get('/leaderboard', protect, getLeaderboard);
router.get('/flat/stats', protect, getStats);

module.exports = router;

const express = require('express');
const protect = require('../middleware/authMiddleware');
const { voteComplaint, getTrending } = require('../controllers/voteController');
const router = express.Router();

router.post('/:id/vote', protect, voteComplaint);
router.get('/trending', protect, getTrending);

module.exports = router;
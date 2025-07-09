const express = require('express');
const protect = require('../middleware/authMiddleware');
const { createComplaint, getComplaints, resolveComplaint } = require('../controllers/complaintController');
const router = express.Router();

router.route('/').post(protect, createComplaint).get(protect, getComplaints);
router.route('/:id/resolve').put(protect, resolveComplaint);

module.exports = router;

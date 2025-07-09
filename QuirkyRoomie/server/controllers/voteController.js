const Complaint = require('../models/Complaint');
const Vote = require('../models/Vote');
const generatePunishment = require('../utils/punishment');

exports.voteComplaint = async (req, res) => {
  const { voteType } = req.body;
  const { id } = req.params;
  const complaint = await Complaint.findById(id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });

  const existing = await Vote.findOne({ user: req.user._id, complaint: id });
  if (existing) return res.status(400).json({ error: 'Already voted' });

  await Vote.create({ user: req.user._id, complaint: id, voteType });

  if (voteType === 'upvote') complaint.votes++;
  else complaint.downvotes++;

  await complaint.save();

  if (complaint.votes >= 10) {
    const punishment = generatePunishment();
    return res.json({ message: 'Punishment triggered', punishment });
  }

  res.json({ message: 'Vote recorded' });
};

exports.getTrending = async (req, res) => {
  const trending = await Complaint.find({ flatCode: req.user.flatCode })
    .sort({ votes: -1 })
    .limit(5);
  res.json(trending);
};
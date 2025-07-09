const User = require('../models/User');
const Complaint = require('../models/Complaint');

exports.getLeaderboard = async (req, res) => {
  const leaderboard = await User.find({ flatCode: req.user.flatCode })
    .sort({ karmaPoints: -1 })
    .select('name karmaPoints');
  res.json(leaderboard);
};

exports.getStats = async (req, res) => {
  const complaints = await Complaint.find({ flatCode: req.user.flatCode });
  const categories = {};
  complaints.forEach((c) => {
    categories[c.type] = (categories[c.type] || 0) + 1;
  });

  const mostComplainedUser = await User.findOne({ flatCode: req.user.flatCode })
    .sort({ complaintsFiledAgainst: -1 })
    .select('name complaintsFiledAgainst');

  res.json({ topCategories: categories, mostComplainedUser });
};
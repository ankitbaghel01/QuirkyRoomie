const Complaint = require('../models/Complaint');
const User = require('../models/User');
const generatePunishment = require('../utils/punishment');

exports.createComplaint = async (req, res) => {
  const { title, description, type, severity } = req.body;
  const complaint = await Complaint.create({
    title,
    description,
    type,
    severity,
    createdBy: req.user._id,
    flatCode: req.user.flatCode,
  });
  res.status(201).json(complaint);
};

exports.getComplaints = async (req, res) => {
  const complaints = await Complaint.find({ flatCode: req.user.flatCode, resolved: false });
  res.json(complaints);
};

exports.resolveComplaint = async (req, res) => {
  const complaint = await Complaint.findById(req.params.id);
  if (!complaint) return res.status(404).json({ error: 'Complaint not found' });
  complaint.resolved = true;
  await complaint.save();
  req.user.karmaPoints += 10;
  await req.user.save();
  res.json({ message: 'Complaint resolved', karma: req.user.karmaPoints });
};

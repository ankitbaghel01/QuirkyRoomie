const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: String,
  description: String,
  type: String,
  severity: String,
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  votes: { type: Number, default: 0 },
  downvotes: { type: Number, default: 0 },
  flatCode: String,
  resolved: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Complaint', complaintSchema);
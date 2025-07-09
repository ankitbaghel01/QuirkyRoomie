const mongoose = require('mongoose');

const voteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  complaint: { type: mongoose.Schema.Types.ObjectId, ref: 'Complaint' },
  voteType: { type: String, enum: ['upvote', 'downvote'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Vote', voteSchema);
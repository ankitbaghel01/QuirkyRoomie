const mongoose = require('mongoose');

const flatSchema = new mongoose.Schema({
  flatCode: { type: String, unique: true, required: true },
  name: { type: String },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Flat', flatSchema);

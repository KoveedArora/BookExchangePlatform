const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  condition: { type: String, enum: ['New', 'Like New', 'Used'], default: 'Used' },
  address: { type: String, required: true },
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  owner: { type: String, required: true }, // New owner field
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
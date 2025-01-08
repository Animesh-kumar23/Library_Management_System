const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publicationYear: { type: Number, required: true },
  totalCopies: { type: Number, required: true, default: 1 }, // Total number of copies for the book
  availableCopies: { type: Number, required: true, default: 1 },
  reservedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null } 
});

module.exports = mongoose.model('Book', bookSchema);

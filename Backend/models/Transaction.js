const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: 'Book', required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  borrowDate: { type: Date, default: Date.now },
  returnDate: { type: Date }
});
const calculateFine = (returnDate, dueDate) => {
  const daysLate = Math.max(0, (returnDate - dueDate) / (1000 * 60 * 60 * 24));
  return daysLate * 10; 
};


module.exports = mongoose.model('Transaction', transactionSchema);

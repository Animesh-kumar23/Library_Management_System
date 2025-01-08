const express = require('express');
const Transaction = require('../models/Transaction');
const Book = require('../models/Book');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Import auth middleware
const router = express.Router();

// Borrow a book
router.post('/borrow', auth, async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Check if the user is blocklisted
    const user = await User.findById(userId);
    if (user.isBlocklisted) {
      return res.status(403).json({ message: 'User is blocklisted and cannot borrow books.' });
    }

    // Check the user's current borrowed book count
    const activeBorrowCount = await Transaction.countDocuments({ userId, returnDate: null });
    if (activeBorrowCount >= user.borrowLimit) { // Assuming `borrowLimit` is defined in User schema
      return res.status(403).json({ message: 'Borrow limit reached. Please return a book before borrowing more.' });
    }

    // Check if the book has available copies
    const book = await Book.findById(bookId);
    if (!book || book.availableCopies <= 0) {
      return res.status(400).json({ message: 'No available copies for borrowing.' });
    }

    // Decrease the available copies
    book.availableCopies -= 1;
    await book.save();

    // Create a transaction
    const transaction = new Transaction({ bookId, userId, borrowDate: new Date() });
    await transaction.save();

    res.status(201).json({ message: 'Book borrowed successfully', transaction });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Return a book
router.post('/return', auth, async (req, res) => {
  try {
    const { bookId, userId } = req.body;

    // Find the transaction and update the return date
    const transaction = await Transaction.findOneAndUpdate(
      { bookId, userId, returnDate: null },
      { returnDate: new Date() },
      { new: true }
    );

    if (!transaction) {
      return res.status(400).json({ message: 'No active transaction found for this book.' });
    }

    // Increment the available copies
    const book = await Book.findById(bookId);
    if (book) {
      book.availableCopies += 1;
      await book.save();
    }

    res.status(200).json({ message: 'Book returned successfully', transaction });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;

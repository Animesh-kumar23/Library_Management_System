const express = require('express');
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');
const router = express.Router();

// Dashboard route to fetch library statistics
router.get('/', async (req, res) => { // Change '/dashboard' to '/'
    try {
      const totalBooks = await Book.aggregate([
        { $group: { _id: null, total: { $sum: '$totalCopies' } } }
      ]);
      const borrowedBooks = await Book.aggregate([
        { $group: { _id: null, borrowed: { $sum: { $subtract: ['$totalCopies', '$availableCopies'] } } } }
      ]);
      const availableBooks = await Book.aggregate([
        { $group: { _id: null, available: { $sum: '$availableCopies' } } }
      ]);

      res.status(200).json({
        totalBooks: totalBooks[0]?.total || 0,
        borrowedBooks: borrowedBooks[0]?.borrowed || 0,
        availableBooks: availableBooks[0]?.available || 0,
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

module.exports = router;

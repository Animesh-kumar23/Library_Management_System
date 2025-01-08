const express = require('express');
const Book = require('../models/Book');
const User = require('../models/User'); // Ensure this is correctly defined
const router = express.Router();
const auth = require('../middleware/auth'); // Import auth middleware
const admin = require('../middleware/admin'); // Import admin middleware

// Add a book (Admin only)
router.post('/', auth, async (req, res) => {
    console.log('Admin Middleware Hit');

    try {
      // Check if the logged-in user is an admin
      if (req.user.role !== 'Admin') {
        console.log('Admin Middleware Hit');
        return res.status(403).json({ message: 'Access denied. You need admin privileges.' });
      }
      console.log('Admin Middleware Hit');

      const book = new Book(req.body);
      await book.save();
      res.status(201).json({ message: 'Book added successfully', book });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

// View all books (Authenticated users)
router.get('/', auth, async (req, res) => {
  const { title, author, genre, year } = req.query;

  const filter = {};
  if (title) filter.title = { $regex: title, $options: 'i' };
  if (author) filter.author = { $regex: author, $options: 'i' };
  if (genre) filter.genre = genre;
  if (year) filter.publicationYear = year;

  try {
    const books = await Book.find(filter);
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a book (Admin only)
router.put('/:id', [auth, admin], async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: 'Book updated successfully', updatedBook });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a book (Admin only)
router.delete('/:id', [auth, admin], async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Book deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// List available books (Authenticated users)
router.get('/available', auth, async (req, res) => {
  try {
    const availableBooks = await Book.find({ availabilityStatus: true });
    res.status(200).json(availableBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Reserve a book (Authenticated users)
router.post('/reserve/:id', auth, async (req, res) => {
  const bookId = req.params.id;
  const { userId } = req.body;

  try {
    const book = await Book.findById(bookId);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    if (book.availabilityStatus) {
      return res.status(400).json({ message: 'Book is currently available and does not need a reservation' });
    }

    if (book.reservedBy) {
      return res.status(400).json({ message: 'Book is already reserved' });
    }

    book.reservedBy = userId;
    await book.save();

    res.status(200).json({ message: 'Book reserved successfully', book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Return a book and notify reserved user (Authenticated users)
router.post('/return/:id', auth, async (req, res) => {
  const bookId = req.params.id;

  try {
    const book = await Book.findById(bookId);

    if (!book || book.availabilityStatus) {
      return res.status(404).json({ message: 'Book not found or already available' });
    }

    // Mark book as available
    book.availabilityStatus = true;
    const reservedUser = book.reservedBy;

    if (reservedUser) {
      // Clear reservation
      book.reservedBy = null;

      // Simulate notification
      const user = await User.findById(reservedUser);
      console.log(`Notification sent to ${user.name}: Book "${book.title}" is now available.`);
    }

    await book.save();

    res.status(200).json({ message: 'Book returned successfully', book });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

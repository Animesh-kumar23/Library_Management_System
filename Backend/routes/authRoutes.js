const express = require('express');
const User = require('../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Register a user
router.post(
  '/register',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    check('role', 'Role must be either Admin or User').optional().isIn(['Admin', 'User']),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, role = 'User' } = req.body; // Default role is 'User'

    try {
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Create and save the user without hashing password here
      user = new User({ name, email, password, role });
      await user.save();

      // Generate JWT
      const payload = { user: { id: user.id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

      res.status(201).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);


// Login a user
router.post(
  '/login',
  [
    // Validation checks
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      // Check if the user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // Check if the password matches
      const isMatch = await bcrypt.compare(password, user.password);
      // console.log("Stored Hash:", user.password); // Log the stored hash
      // console.log("Entered Password:", password); // Log the entered password
      // console.log("Password Match:", isMatch); // Log the result of the comparison
      
      if (!isMatch) {
        return res.status(400).json({ message: 'Invaliddd credentials' });
      }

      // Generate JWT
      const payload = { user: { id: user.id, role: user.role } };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10h' });

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
);

module.exports = router;
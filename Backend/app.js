require('dotenv').config(); // Ensure dotenv is loaded at the top
//MONGO_URI=mongodb://localhost:27017/library

const EventEmitter = require('events');
EventEmitter.defaultMaxListeners = 20; // Increase the limit to 20 or any appropriate number

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import cors
const bodyParser = require('body-parser');
const bookRoutes = require('./routes/bookRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const authRoutes = require('./routes/authRoutes'); // Import authRoutes
const dashboardRoute = require('./routes/dashboardRoute'); // Import dashboardRoute

const app = express();

// Enable CORS for frontend (React is usually on port 3000)
app.use(cors({
  origin: 'https://powerful-tundra-83274-2fcf468e691d.herokuapp.com', // Adjust the frontend URL if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow the necessary HTTP methods
  credentials: true, // Allow cookies and authorization headers
}));

// Use express.json() to parse incoming requests
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/books', bookRoutes);
app.use('/api/transaction', transactionRoutes);
app.use('/api/auth', authRoutes); // Mount authRoutes
app.use('/api/dashboard', dashboardRoute); // Mount dashboardRoute with '/api/dashboard' prefix

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

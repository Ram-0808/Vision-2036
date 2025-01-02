const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const institutionRoutes = require('./src/routes/institution');
const studentRoutes = require('./src/routes/student');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb+srv://madhusudhan:madhu265@vision-2036.uhbyi.mongodb.net/?retryWrites=true&w=majority&appName=vision-2036')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes

app.use('/api/institutions', institutionRoutes);
app.use('/api/students', studentRoutes);

// Basic error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
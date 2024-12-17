const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const dbConnect = require('./config/db');

const app = express();

// Connect to MongoDB
dbConnect();

app.use(express.json()); // For parsing application/json
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

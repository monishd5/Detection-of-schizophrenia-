const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('./models/Users');
const app = express();



app.use(express.json()); // To parse JSON requests

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/schizoApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// JWT Secret
const JWT_SECRET = 'your_jwt_secret_here';

// Signup Route
app.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  // Check if the email starts with 'd@' or 'p@' to set the role
  let role = '';
  if (email.startsWith('d@')) {
    role = 'doctor';
  } else if (email.startsWith('p@')) {
    role = 'patient';
  } else {
    return res.status(400).json({ error: 'Email must start with d@ or p@' });
  }

  try {
    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: 'User created successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Error creating user.' });
  }
});

// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'User not found!' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials!' });
    }

    // Generate JWT Token
    const token = jwt.sign({ userId: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ message: 'Login successful!', token, role: user.role });
  } catch (err) {
    res.status(500).json({ error: 'Error logging in.' });
  }
});

// Start the server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Import User model
const User = require('./user');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Temporary tankLevels storage (we'll replace later if needed)
const tankLevels = [];

// IoT route
app.post('/api/iot/tank-level', (req, res) => {
  const { level } = req.body;
  if (typeof level !== 'number') return res.status(400).json({ success: false, message: 'Invalid level value' });

  console.log(`📡 Received tank level: ${level}%`);
  tankLevels.push({ level, time: new Date() });
  res.json({ success: true, message: 'Level received' });
});

app.get('/api/iot/get-levels', (req, res) => {
  res.json(tankLevels.slice(-10).reverse());
});

// Dashboard route
app.get('/api/dashboard/data', (req, res) => {
  const latestLevel = tankLevels.length > 0 ? tankLevels[tankLevels.length - 1].level : 0;

  const activeOrders = 2; // Replace with DB queries later
  const bookingHistory = [
    { id: 1, date: '2025-10-17', status: 'Delivered' },
    { id: 2, date: '2025-10-18', status: 'Pending' }
  ];

  res.json({ tankLevel: latestLevel, activeOrders, bookingHistory });
});

// ✅ Signup route
app.post('/api/auth/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const user = new User({ name, email, password });
    await user.save();

    res.status(201).json({ message: 'Account created successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// ✅ Login route
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const jwt = require('jsonwebtoken');
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

// Root route
app.get('/', (req, res) => res.send('🚀 SmartTanker Backend is running!'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// 🧠 Temporary in-memory storage (data will reset if server restarts)
const tankLevels = [];

// 📡 Route for IoT device to send tank level data
app.post('/api/iot/tank-level', (req, res) => {
  const { level } = req.body;

  if (typeof level !== 'number') {
    return res.status(400).json({ success: false, message: 'Invalid level value' });
  }

  console.log(`📡 Received tank level: ${level}%`);

  // Store the data with timestamp
  tankLevels.push({
    level,
    time: new Date()
  });

  res.json({ success: true, message: 'Level received' });
});

// 🌐 Route for frontend to fetch the latest tank level readings
app.get('/api/iot/get-levels', (req, res) => {
  // Send last 10 readings in reverse order (newest first)
  res.json(tankLevels.slice(-10).reverse());
});


// 🧭 Route for Dashboard page
app.get('/api/dashboard/data', (req, res) => {
  // Get the most recent tank level if available
  const latestLevel = tankLevels.length > 0 ? tankLevels[tankLevels.length - 1].level : 0;

  // Mock active orders and booking history (replace with real DB later)
  const activeOrders = 2;
  const bookingHistory = [
    { id: 1, date: '2025-10-17', status: 'Delivered' },
    { id: 2, date: '2025-10-18', status: 'Pending' }
  ];

  res.json({
    tankLevel: latestLevel,
    activeOrders,
    bookingHistory
  });
});


// 🏠 Basic route to check if server is running
app.get('/', (req, res) => {
  res.send('🚀 SmartTanker Backend is running!');
});

// 🚀 Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));


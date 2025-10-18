exports.getDashboardData = async (req, res) => {
  try {
    // Mock data (later replace with actual DB + IoT integration)
    const data = {
      tankLevel: 45, // percentage
      activeOrders: 2,
      bookingHistory: [
        { id: 1, date: '2025-10-10', status: 'Delivered' },
        { id: 2, date: '2025-10-15', status: 'Pending' },
      ]
    };
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

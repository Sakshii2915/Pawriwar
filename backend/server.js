const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const paymentRoutes = require('./routes/payment');

const app = express();
dotenv.config();

// Connect DB
const connectDB = require('./db');
connectDB();

// ✅ Secure CORS — allow only your frontend + admin panel
app.use(cors({
  origin: [
    'https://pawriwar-frontend.onrender.com',
    'https://pawriwar-admin-panel.onrender.com'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route imports
const adoptionRoutes = require('./routes/adoptions');
const dogRoutes = require('./routes/dogRoutes');
const donationsRoute = require("./routes/donations");

// Route usage
app.use('/api/adoptions', adoptionRoutes);
app.use('/api/dogs', dogRoutes);
app.use('/api/donations', donationsRoute);
app.use('/api/payment', paymentRoutes);

// ✅ Health check / root route
app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



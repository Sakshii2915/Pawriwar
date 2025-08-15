const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
  },
  donorEmail: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
  },
}, { timestamps: true });

const Donation = mongoose.model('Donation', donationSchema);

module.exports = Donation;

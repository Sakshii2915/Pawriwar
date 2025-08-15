// backend/routes/donations.js
const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");
const Donation = require("../models/donations");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const { name, amount, contact, message } = req.body;

    const donation = await Donation.create({ name, amount, contact, message });

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: donation._id.toString(),
    };

    const order = await razorpayInstance.orders.create(options);

    donation.razorpayOrderId = order.id;
    await donation.save();

    res.json({
      success: true,
      order,
      key_id: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Error creating Razorpay order:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;

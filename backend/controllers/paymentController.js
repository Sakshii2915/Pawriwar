const razorpay = require('../utils/razorpay');

const createOrder = async (req, res) => {
  try {
    const { amount } = req.body;

    const options = {
      amount: amount, // convert to paise
      currency: "INR",
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

module.exports = { createOrder };

import React from "react";
import axios from "axios";

const Donate = () => {
  const createOrder = async () => {
    try {
      // 1️⃣ Make sure Razorpay script is loaded
      if (!window.Razorpay) {
        alert("Razorpay SDK not loaded. Please refresh the page.");
        return;
      }

      // 2️⃣ Send donation details to backend
      const donationDetails = {
        name: "John Doe",
        amount: 500, // ₹500
        contact: "9876543210",
        message: "Keep up the great work!"
      };

      const { data } = await axios.post(
        "http://localhost:5000/api/donations/create-order", // ✅ Use full URL if no proxy
        donationDetails
      );

      // 3️⃣ Log backend response for debugging
      console.log("Backend Response:", data);

      if (!data.success) {
        alert("Unable to create order. Please try again.");
        return;
      }

      // 4️⃣ Setup Razorpay payment options
      const options = {
        key: data.key_id, // from backend
        amount: data.order.amount, // in paise
        currency: data.order.currency,
        name: "Pawriwar Donations",
        description: "Thank you for donating!",
        order_id: data.order.id,
        handler: function (response) {
          alert(
            `✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`
          );
        },
        prefill: {
          name: "John Doe",
          email: "johndoe@example.com",
          contact: "9876543210"
        },
        theme: {
          color: "#F37254"
        }
      };

      // 5️⃣ Open Razorpay popup
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      console.error("Error in createOrder:", err);
      alert("❌ Something went wrong while processing payment.");
    }
  };

  return (
    <div>
      <button
        onClick={createOrder}
        style={{
          background: "#F37254",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer"
        }}
      >
        Donate Now ₹500
      </button>
    </div>
  );
};

export default Donate;

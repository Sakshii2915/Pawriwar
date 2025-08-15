// import React, { useState } from 'react';
// import './DonatePage.css';

// const DonatePage = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     email: '',
//     amount: '',
//     currency: 'INR',
//     message: '',
//   });

//   const [donated, setDonated] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleDonate = (e) => {
//     e.preventDefault();

//     if (formData.amount < 1) {
//       alert('Minimum donation amount is ₹1');
//       return;
//     }

//     console.log('Donation Data:', formData);
//     setDonated(true);
//     setFormData({
//       name: '',
//       email: '',
//       amount: '',
//       currency: 'INR',
//       message: '',
//     });
//   };

//   return (
//     <div className="donate-page">
//       <h1>Support Street Dogs 💕</h1>
//       <p>Every penny matters. Even ₹1 can help us feed and care for street dogs.</p>

//       <form onSubmit={handleDonate} className="donation-form">
//         <input
//           type="text"
//           name="name"
//           placeholder="Your Name (optional)"
//           value={formData.name}
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Your Email (optional)"
//           value={formData.email}
//           onChange={handleChange}
//         />

//         <input
//           type="number"
//           name="amount"
//           placeholder="Donation Amount"
//           value={formData.amount}
//           onChange={handleChange}
//           min="1"
//           required
//         />

//         <select
//           name="currency"
//           value={formData.currency}
//           onChange={handleChange}
//         >
//           <option value="INR">₹ INR</option>
//           <option value="USD">$ USD</option>
//           <option value="EUR">€ EUR</option>
//         </select>

//         <textarea
//           name="message"
//           placeholder="Message or Purpose (optional)"
//           value={formData.message}
//           onChange={handleChange}
//         />

//         <button type="submit">Donate Now</button>
//       </form>

//       {donated && (
//         <p className="success-message">💖 Thank you for your contribution! 💖</p>
//       )}
//     </div>
//   );
// };

// export default DonatePage;

import React, { useState } from "react";
import "./DonatePage.css";

const DonatePage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    amount: "",
    currency: "INR",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    if (formData.amount < 1) {
      alert("Minimum donation amount is ₹1");
      return;
    }

    const res = await loadRazorpayScript();
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    // 1️⃣ Create order on backend
    const orderData = await fetch("http://localhost:5000/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: formData.amount, // Razorpay works in paisa
        currency: formData.currency,
      }),
    }).then((res) => res.json());

    // 2️⃣ Open Razorpay Checkout
    const options = {
      key: "rzp_test_JupEUbkHagWiXH", // Replace with your Razorpay key
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Street Dog Donation",
      description: formData.message || "Donation for street dogs",
      image: "https://example.com/logo.png", // optional
      order_id: orderData.id,
      handler: async function (response) {
        // 3️⃣ Verify payment on backend
        const verifyRes = await fetch("http://localhost:5000/api/payment/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(response),
        }).then((res) => res.json());

        if (verifyRes.success) {
          alert("Thank you! Payment successful.");
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: formData.name,
        email: formData.email,
      },
      theme: { color: "#3399cc" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <div className="donate-page">
      <h1>Support Street Dogs 💕</h1>
      <p>Every penny matters. Even ₹1 can help us feed and care for street dogs.</p>

      <form onSubmit={handleDonate} className="donation-form">
        <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} />
        <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} />
        <input type="number" name="amount" placeholder="Donation Amount" value={formData.amount} onChange={handleChange} min="1" required />
        <select name="currency" value={formData.currency} onChange={handleChange}>
          <option value="INR">₹ INR</option>
          <option value="USD">$ USD</option>
          <option value="EUR">€ EUR</option>
        </select>
        <textarea name="message" placeholder="Message or Purpose" value={formData.message} onChange={handleChange} />
        <button type="submit">Donate Now</button>
      </form>
    </div>
  );
};

export default DonatePage;


import React, { useState } from 'react';
import './AdoptionFormModal.css';
import axios from 'axios';

const AdoptionFormModal = ({ dog, onClose }) => {
  const [adopterName, setAdopterName] = useState('');
  const [contact, setContact] = useState('');
  const [reason, setReason] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await axios.post('https://pawriwar-backend.onrender.com', {
  adopterName,
  contact,
  reason,
  dogId: dog._id, // this MUST be dog._id, not dog.name
});


    console.log('Form submitted successfully:', response.data);
    setSubmitted(true);
  } catch (err) {
    console.error('Submission failed:', err.response?.data || err.message);
    alert('Submission failed. Please check the backend logs.');
  }
};


  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>×</button>

        {!submitted ? (
          <>
            <h2>Adopt {dog?.name}</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your Name"
                value={adopterName}
                onChange={(e) => setAdopterName(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Your Email"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <textarea
                placeholder="Why do you want to adopt?"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                required
              ></textarea>
              <button type="submit">Submit Request</button>
            </form>
          </>
        ) : (
          <div className="thank-you">
            <h3>Thank you for your interest in adopting {dog?.name}!</h3>
            <p>We will contact you soon. 🐶💌</p>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdoptionFormModal;

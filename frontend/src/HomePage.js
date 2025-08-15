// src/HomePage.js
import React, { useState, useRef, useEffect } from 'react';
import DogList from './DogList';
import ChatBot from './ChatBot';
import './HomePage.css';

function HomePage() {
  const [selectedDog, setSelectedDog] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("admin") === "true") {
      setIsAdmin(true);
    }
  }, []);

  const handleAdopt = (dogName) => {
    setSelectedDog(dogName);
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted! (Backend logic coming next 🔧)");
    e.target.reset();
    setSelectedDog(null);
  };

  return (
    <div className="app"> {/* 👈 Add this wrapper */}
      <header className="header">
        <h1>🐾 Pawriwar</h1>
        <p className="in-memory">in memory of Laila</p>
        <p className="by-sakshi">by Sakshi</p>
        <p>Helping abandoned and street dogs find loving homes 💛</p>

        {isAdmin && (
          <a href="#/admin/adoptions">
            <button className="admin-btn">View Adoption Requests</button>
          </a>
        )}
      </header>

      <section className="about">
        <h2>About Us</h2>
        <p>
          Pawriwar is a safe space where furry angels waiting on the streets find forever homes.
          We list adoptable dogs, help connect pet parents, and raise awareness for their care. 💕
        </p>
      </section>

      <h2 className="section-title">Meet Our Dogs</h2>
      <p className="adopt-quote">
        <strong>Adoption is free — because every dog deserves a loving home.</strong>
      </p>
      <DogList onAdopt={handleAdopt} />

      <section className="why-adopt">
        <h2>Why Adopt?</h2>
        <ul>
          <li>💖 Save a life and give a dog a home</li>
          <li>🐶 Get unconditional love from a loyal furry friend</li>
          <li>🌍 Help reduce street animal population</li>
        </ul>
      </section>

      <ChatBot />

      {selectedDog && (
        <section ref={formRef} className="adoption-modal">
          <h2>Adopt {selectedDog}</h2>
          <form className="adoption-form" onSubmit={handleSubmit}>
            <label>
              Your Name
              <input type="text" name="name" placeholder="Enter your name" required />
            </label>
            <label>
              Email
              <input type="email" name="email" placeholder="Enter your email" required />
            </label>
            <label>
              Why do you want to adopt?
              <textarea name="reason" placeholder="Tell us your reason..." rows="4" required />
            </label>
            <button type="submit">Submit</button>
          </form>
        </section>
      )}

      <footer className="footer">
        <p>Made with 🧡 by Sakshi for all the good bois & girls 🐕</p>
        <p>© 2025 Pawriwar – All rights reserved</p>
      </footer>
    </div>
  );
}

export default HomePage;

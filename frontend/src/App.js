// src/App.js
import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import DonatePage from './pages/DonatePage';
import './App.css'; // if you want to style it
import Donate from './components/Donate';


function App() {
  return (
    <Router>
      {/* Simple Navbar */}
      <nav style={styles.navbar}>
        <Link style={styles.link} to="/">Home</Link>
        <Link style={styles.link} to="/donate">Donate</Link>
      </nav>

      {/* Page Routing */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/donate" element={<Donate />} />

      </Routes>
    </Router>
  );
}

// Inline styles (you can move to CSS later if you want)
const styles = {
  navbar: {
    padding: '15px 30px',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    justifyContent: 'flex-start',
    gap: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  link: {
    textDecoration: 'none',
    color: '#333',
    fontWeight: 'bold',
    fontSize: '16px',
  },
};

export default App;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [adoptions, setAdoptions] = useState([]);

  useEffect(() => {
    const fetchAdoptions = async () => {
      try {
        const res = await axios.get('https://pawriwar-backend.onrender.com');
        setAdoptions(res.data);
      } catch (err) {
        console.error('Error fetching adoptions:', err.message);
      }
    };

    fetchAdoptions();
  }, []);

  return (
    <div className="admin-container">
      <h1>Adoption Requests</h1>
      {adoptions.length === 0 ? (
        <p>No adoption requests found.</p>
      ) : (
        adoptions.map((item) => (
          <div className="adoption-card" key={item._id}>
            <h3>{item.adopterName}</h3>
            <p><strong>Contact:</strong> {item.contact}</p>
            <p><strong>Reason:</strong> {item.reason}</p>
            <p><strong>Dog:</strong> {item.dogId?.name || 'Unknown'}</p>
            {item.dogId?.image && (
              <img
                src={`https://pawriwar-backend.onrender.com/${item.dogId.image}`}
                alt={item.dogId?.name}
                style={{ width: "200px", height: "auto" }}
              />
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default App;

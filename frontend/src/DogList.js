import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AdoptionFormModal from './AdoptionFormModal'; // Make sure this file exists
import './DogList.css';

const DogList = () => {
  const [dogs, setDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null); // To track which dog is selected for adoption

  // Fetch all dog data from backend
  useEffect(() => {
    axios.get('http://localhost:5000/api/dogs')
      .then((response) => setDogs(response.data))
      .catch((error) => console.error('Error fetching dogs:', error));
  }, []);

  return (
    <div className="dog-list-container">
      {dogs.map((dog) => (
        <div className="dog-card" key={dog._id}>
          <img
            src={dog.image}
            alt={dog.name}
            className="dog-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/200x200.png?text=No+Image';
            }}
          />
          <h3>{dog.name}</h3>
          <p>{dog.description}</p>
          <button
            className="adopt-btn"
            onClick={() => setSelectedDog(dog)}
          >
            Adopt Me
          </button>
        </div>
      ))}

      {/* Show modal only if a dog is selected */}
      {selectedDog && (
        <AdoptionFormModal
          dog={selectedDog}
          onClose={() => setSelectedDog(null)}
        />
      )}
    </div>
  );
};

export default DogList;

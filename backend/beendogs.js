const mongoose = require('mongoose');
const Dog = require('./models/Dog'); // adjust path if needed
const connectDB = require('./db');   // adjust path if needed

const seedDogs = async () => {
  await connectDB();

  const sampleDogs = [
    {
      name: 'Buddy',
      description: 'A playful pup found near the station.',
      image: "/adopt1.jpg",
    },
    {
      name: 'Bella',
      description: 'Loves belly rubs and chasing butterflies.',
      image: "/adopt2.jpg",
    },
    {
      name: 'Tommy',
      description: 'Was rescued from a highway — now looking for love.',
      image: "/adopt3.jpg",
    },
    {
      name: 'Sandy',
      description: 'Calm, sweet, and gets along with everyone.',
      image: "/adopt4.jpg",
    },
    {
      name: 'Sheru',
      description: 'Has the cutest bark and loves food.',
      image: "/adopt.jpg",
    },
    {
      name: 'Golu',
      description: 'Street-born but full of hope and joy.',
      image: "/adopt5.jpg",
    },
  ];

  await Dog.deleteMany();           // Clear old data
  await Dog.insertMany(sampleDogs); // Insert updated dogs
  console.log('✅ Sample dogs added to MongoDB!');
  process.exit();
};

seedDogs();

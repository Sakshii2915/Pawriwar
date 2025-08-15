const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// POST route - to submit an adoption form
router.post('/', async (req, res) => {
  try {
    const { adopterName, contact, reason, dogId } = req.body;

    const newAdoption = new Adoption({
      adopterName,
      contact,
      reason,
      dogId,
    });

    await newAdoption.save();
    res.status(201).json({ message: 'Adoption request submitted' });
  } catch (error) {
    console.error('Error saving adoption:', error);
    res.status(500).json({ error: 'Server error while saving adoption' });
  }
});

// GET route - to fetch all adoption requests
router.get('/', async (req, res) => {
  try {
    const adoptions = await Adoption.find().populate('dogId');
    res.status(200).json(adoptions);
  } catch (error) {
    console.error('Error fetching adoptions:', error);
    res.status(500).json({ error: 'Server error while fetching adoptions' });
  }
});

module.exports = router;

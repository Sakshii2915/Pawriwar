const express = require('express');
const router = express.Router();
const Dog = require('../models/Dog');

// GET /api/dogs - fetch all dogs
router.get('/', async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: 'Server Error: ' + err.message });
  }
});

module.exports = router;

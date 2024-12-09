// routes/positionRoutes.js
const express = require('express');
const Position = require('../models/Position');
const router = express.Router();

// Create a new position
router.post('/', async (req, res) => {
  try {
    const { title } = req.body;
    const newPosition = new Position({ title });
    await newPosition.save();
    res.status(201).json(newPosition);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all positions for the dropdown
router.get('/', async (req, res) => {
  try {
    const positions = await Position.find().populate('');
    res.json(positions);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a position by ID
router.put('/:id', async (req, res) => {

  try {
    console.log(req.body);
    
    const position = await Position.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!position) return res.status(404).json({ message: 'Position not found' });
    res.json(position);
    
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a position by ID
router.delete('/:id', async (req, res) => {
  try {
    const position = await Position.findByIdAndDelete(req.params.id);
    if (!position) return res.status(404).json({ message: 'Position not found' });
    res.json({ message: 'Position deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;  





//monday code

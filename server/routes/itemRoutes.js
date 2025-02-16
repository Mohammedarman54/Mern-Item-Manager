const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// Add Item (POST)
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const newItem = new Item({ name });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get All Items (GET)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Create Order
router.post('/', async (req, res) => {
  try {
    const { userId, productIds, totalAmount } = req.body;
    if (!userId || !Array.isArray(productIds) || productIds.length === 0 || !totalAmount) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const order = new Order({ userId, productIds, totalAmount });
    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get Order by ID
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Update Order
router.put('/:id', async (req, res) => {
  try {
    const { userId, productIds, totalAmount } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { userId, productIds, totalAmount },
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete Order
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;

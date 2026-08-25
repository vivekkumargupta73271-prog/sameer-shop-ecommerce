const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const Order = require('../models/Order');

// Add product (Admin)
router.post('/products', async (req, res) => {
  try {
    const { name, description, price, discountPrice, images, sizes, colors, category } = req.body;
    
    const product = new Product({
      name,
      description,
      price,
      discountPrice,
      images,
      sizes,
      colors,
      category
    });

    await product.save();
    res.status(201).json({ success: true, message: 'Product added successfully', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update product (Admin)
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Delete product (Admin)
router.delete('/products/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all orders (Admin)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, data: orders });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update order status (Admin)
router.put('/orders/:orderId', async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findOneAndUpdate(
      { orderId: req.params.orderId },
      { orderStatus, updatedAt: new Date() },
      { new: true }
    );
    res.json({ success: true, message: 'Order status updated', data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;

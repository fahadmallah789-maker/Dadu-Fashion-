// backend/routes/adminRoutes.js
const express = require('express');
const { loginAdmin, getDashboardStats, getSalesReport } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const router = express.Router();

router.post('/login', loginAdmin);
router.get('/dashboard', protectAdmin, getDashboardStats);
router.get('/sales-report', protectAdmin, getSalesReport);
router.get('/users', protectAdmin, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});
router.get('/orders', protectAdmin, async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort('-createdAt');
  res.json(orders);
});
router.get('/products', protectAdmin, async (req, res) => {
  const products = await Product.find().populate('category');
  res.json(products);
});

module.exports = router;
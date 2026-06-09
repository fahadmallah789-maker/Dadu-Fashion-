// backend/controllers/adminController.js
const User = require('../models/User');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });
  if (admin && (await admin.matchPassword(password))) {
    admin.lastLogin = Date.now();
    await admin.save();
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      token: jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '30d' })
    });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
};

const getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
  const totalProducts = await Product.countDocuments();
  const totalOrders = await Order.countDocuments();
  const totalRevenue = await Order.aggregate([{ $group: { _id: null, total: { $sum: '$totalPrice' } } }]);
  const recentOrders = await Order.find().sort('-createdAt').limit(5).populate('user', 'name');
  
  res.json({
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue[0]?.total || 0,
    recentOrders
  });
};

const getSalesReport = async (req, res) => {
  const { startDate, endDate } = req.query;
  const query = {};
  if (startDate && endDate) {
    query.createdAt = { $gte: new Date(startDate), $lte: new Date(endDate) };
  }
  const orders = await Order.find(query);
  const totalSales = orders.reduce((acc, o) => acc + o.totalPrice, 0);
  const totalOrders = orders.length;
  const averageOrderValue = totalOrders > 0 ? totalSales / totalOrders : 0;
  
  res.json({ totalSales, totalOrders, averageOrderValue, orders });
};

module.exports = { loginAdmin, getDashboardStats, getSalesReport };
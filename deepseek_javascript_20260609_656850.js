// backend/routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/profile', protect, async (req, res) => {
  res.json(req.user);
});

router.put('/profile', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.phone = req.body.phone || user.phone;
  user.address = req.body.address || user.address;
  if (req.body.password) {
    user.password = req.body.password;
  }
  await user.save();
  res.json(user);
});

router.post('/wishlist/:productId', protect, async (req, res) => {
  const user = await User.findById(req.user._id);
  const index = user.wishlist.indexOf(req.params.productId);
  if (index === -1) {
    user.wishlist.push(req.params.productId);
  } else {
    user.wishlist.splice(index, 1);
  }
  await user.save();
  res.json({ wishlist: user.wishlist });
});

router.get('/wishlist', protect, async (req, res) => {
  const user = await User.findById(req.user._id).populate('wishlist');
  res.json(user.wishlist);
});

module.exports = router;
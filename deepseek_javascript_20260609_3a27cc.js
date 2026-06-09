// backend/routes/couponRoutes.js
const express = require('express');
const Coupon = require('../models/Coupon');
const { protectAdmin } = require('../middleware/adminMiddleware');
const router = express.Router();

router.get('/', protectAdmin, async (req, res) => {
  const coupons = await Coupon.find();
  res.json(coupons);
});

router.post('/', protectAdmin, async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
});

router.put('/:id', protectAdmin, async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(coupon);
});

router.delete('/:id', protectAdmin, async (req, res) => {
  await Coupon.findByIdAndDelete(req.params.id);
  res.json({ message: 'Coupon deleted' });
});

// Public route to validate coupon
router.post('/validate', async (req, res) => {
  const { code, cartTotal } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), isActive: true });
  if (!coupon || coupon.validFrom > new Date() || coupon.validUntil < new Date() || coupon.usedCount >= coupon.usageLimit) {
    return res.status(400).json({ valid: false, message: 'Invalid or expired coupon' });
  }
  if (cartTotal < coupon.minOrderAmount) {
    return res.status(400).json({ valid: false, message: `Minimum order amount is ₨ ${coupon.minOrderAmount}` });
  }
  let discount = coupon.discountType === 'percentage' ? (cartTotal * coupon.discountValue) / 100 : coupon.discountValue;
  if (coupon.maxDiscountAmount && discount > coupon.maxDiscountAmount) {
    discount = coupon.maxDiscountAmount;
  }
  res.json({ valid: true, discount, code: coupon.code });
});

module.exports = router;
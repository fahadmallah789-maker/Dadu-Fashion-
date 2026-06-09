// backend/routes/bannerRoutes.js
const express = require('express');
const Banner = require('../models/Banner');
const { protectAdmin } = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', async (req, res) => {
  const banners = await Banner.find({ isActive: true }).sort('order');
  res.json(banners);
});

router.post('/', protectAdmin, upload.single('image'), async (req, res) => {
  const banner = await Banner.create({ ...req.body, image: req.file.path });
  res.status(201).json(banner);
});

router.put('/:id', protectAdmin, async (req, res) => {
  const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(banner);
});

router.delete('/:id', protectAdmin, async (req, res) => {
  await Banner.findByIdAndDelete(req.params.id);
  res.json({ message: 'Banner deleted' });
});

module.exports = router;
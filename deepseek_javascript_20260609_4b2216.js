// backend/routes/productRoutes.js
const express = require('express');
const { getProducts, getProductBySlug, getFeaturedProducts, getNewArrivals, getBestSellers, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { protectAdmin } = require('../middleware/adminMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

router.get('/', getProducts);
router.get('/featured', getFeaturedProducts);
router.get('/new-arrivals', getNewArrivals);
router.get('/best-sellers', getBestSellers);
router.get('/:slug', getProductBySlug);
router.post('/', protectAdmin, upload.array('images', 5), createProduct);
router.put('/:id', protectAdmin, updateProduct);
router.delete('/:id', protectAdmin, deleteProduct);

module.exports = router;
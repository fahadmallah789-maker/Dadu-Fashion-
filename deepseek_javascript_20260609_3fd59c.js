// backend/controllers/productController.js
const Product = require('../models/Product');
const Category = require('../models/Category');
const Review = require('../models/Review');

// @desc    Get all products
// @route   GET /api/products
const getProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 12;
  const skip = (page - 1) * limit;
  
  let query = {};
  
  // Search
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: 'i' };
  }
  
  // Category filter
  if (req.query.category) {
    query.category = req.query.category;
  }
  
  // Gender filter
  if (req.query.gender) {
    query.gender = req.query.gender;
  }
  
  // Price filter
  if (req.query.minPrice || req.query.maxPrice) {
    query.price = {};
    if (req.query.minPrice) query.price.$gte = parseInt(req.query.minPrice);
    if (req.query.maxPrice) query.price.$lte = parseInt(req.query.maxPrice);
  }
  
  // Size filter
  if (req.query.size) {
    query.sizes = req.query.size;
  }
  
  // Sorting
  let sort = {};
  if (req.query.sort) {
    switch (req.query.sort) {
      case 'price_asc': sort.price = 1; break;
      case 'price_desc': sort.price = -1; break;
      case 'rating_desc': sort.rating = -1; break;
      case 'newest': sort.createdAt = -1; break;
      default: sort.createdAt = -1;
    }
  }
  
  const products = await Product.find(query)
    .populate('category')
    .sort(sort)
    .skip(skip)
    .limit(limit);
  
  const total = await Product.countDocuments(query);
  
  res.json({
    products,
    page,
    pages: Math.ceil(total / limit),
    total
  });
};

// @desc    Get single product
// @route   GET /api/products/:slug
const getProductBySlug = async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate('category');
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  const reviews = await Review.find({ product: product._id }).populate('user', 'name');
  res.json({ ...product.toObject(), reviews });
};

// @desc    Get featured products
// @route   GET /api/products/featured
const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ isFeatured: true }).limit(8);
  res.json(products);
};

// @desc    Get new arrivals
// @route   GET /api/products/new-arrivals
const getNewArrivals = async (req, res) => {
  const products = await Product.find({ isNewArrival: true }).sort('-createdAt').limit(8);
  res.json(products);
};

// @desc    Get best sellers
// @route   GET /api/products/best-sellers
const getBestSellers = async (req, res) => {
  const products = await Product.find({ isBestSeller: true }).limit(8);
  res.json(products);
};

// @desc    Create product (Admin)
// @route   POST /api/products
const createProduct = async (req, res) => {
  const { name, description, price, discountPrice, category, images, sizes, colors, stock, gender } = req.body;
  const slug = name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  const product = await Product.create({
    name, slug, description, price, discountPrice, category, images, sizes, colors, stock, gender
  });
  res.status(201).json(product);
};

// @desc    Update product (Admin)
// @route   PUT /api/products/:id
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
};

// @desc    Delete product (Admin)
// @route   DELETE /api/products/:id
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await product.deleteOne();
  res.json({ message: 'Product removed' });
};

module.exports = {
  getProducts,
  getProductBySlug,
  getFeaturedProducts,
  getNewArrivals,
  getBestSellers,
  createProduct,
  updateProduct,
  deleteProduct
};
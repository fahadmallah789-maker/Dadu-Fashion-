// backend/controllers/reviewController.js
const Review = require('../models/Review');
const Product = require('../models/Product');
const Order = require('../models/Order');

const createReview = async (req, res) => {
  const { rating, title, comment, productId } = req.body;
  
  // Check if user purchased the product
  const hasPurchased = await Order.findOne({
    user: req.user._id,
    'orderItems.product': productId,
    isDelivered: true
  });
  
  const existingReview = await Review.findOne({ user: req.user._id, product: productId });
  if (existingReview) {
    return res.status(400).json({ message: 'You already reviewed this product' });
  }
  
  const review = await Review.create({
    user: req.user._id,
    product: productId,
    rating,
    title,
    comment,
    isVerifiedPurchase: !!hasPurchased
  });
  
  // Update product rating
  const reviews = await Review.find({ product: productId });
  const avgRating = reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length;
  await Product.findByIdAndUpdate(productId, { rating: avgRating, numReviews: reviews.length });
  
  res.status(201).json(review);
};

const getProductReviews = async (req, res) => {
  const reviews = await Review.find({ product: req.params.productId }).populate('user', 'name');
  res.json(reviews);
};

module.exports = { createReview, getProductReviews };
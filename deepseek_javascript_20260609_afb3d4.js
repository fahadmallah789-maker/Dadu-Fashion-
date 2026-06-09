// backend/controllers/orderController.js
const Order = require('../models/Order');
const Product = require('../models/Product');
const Coupon = require('../models/Coupon');
const { sendEmail } = require('../utils/emailService');

// @desc    Create order
// @route   POST /api/orders
const createOrder = async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, couponCode } = req.body;
  
  if (!orderItems || orderItems.length === 0) {
    return res.status(400).json({ message: 'No order items' });
  }
  
  let itemsPrice = 0;
  for (const item of orderItems) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      return res.status(400).json({ message: `Insufficient stock for ${product?.name || 'product'}` });
    }
    itemsPrice += product.price * item.quantity;
  }
  
  let discountPrice = 0;
  let coupon = null;
  if (couponCode) {
    coupon = await Coupon.findOne({ code: couponCode.toUpperCase(), isActive: true });
    if (coupon && coupon.validFrom <= new Date() && coupon.validUntil >= new Date()) {
      if (coupon.usageLimit > coupon.usedCount && itemsPrice >= coupon.minOrderAmount) {
        if (coupon.discountType === 'percentage') {
          discountPrice = (itemsPrice * coupon.discountValue) / 100;
          if (coupon.maxDiscountAmount && discountPrice > coupon.maxDiscountAmount) {
            discountPrice = coupon.maxDiscountAmount;
          }
        } else {
          discountPrice = coupon.discountValue;
        }
        coupon.usedCount++;
        await coupon.save();
      }
    }
  }
  
  const shippingPrice = itemsPrice > 5000 ? 0 : 200;
  const totalPrice = itemsPrice - discountPrice + shippingPrice;
  
  const order = await Order.create({
    user: req.user._id,
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    discountPrice,
    shippingPrice,
    totalPrice,
    coupon: coupon?._id
  });
  
  // Update stock
  for (const item of orderItems) {
    await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.quantity } });
  }
  
  // Send email notification
  await sendEmail({
    to: req.user.email,
    subject: 'Order Confirmation',
    html: `<h1>Thank you for your order!</h1><p>Order ID: ${order._id}</p><p>Total: ₨ ${totalPrice}</p>`
  });
  
  res.status(201).json(order);
};

// @desc    Get user orders
// @route   GET /api/orders/myorders
const getMyOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort('-createdAt');
  res.json(orders);
};

// @desc    Get order by ID
// @route   GET /api/orders/:id
const getOrderById = async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  res.json(order);
};

// @desc    Update order status (Admin)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }
  order.status = req.body.status;
  if (req.body.status === 'Delivered') {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
  }
  await order.save();
  res.json(order);
};

module.exports = { createOrder, getMyOrders, getOrderById, updateOrderStatus };
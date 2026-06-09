// frontend/src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [coupon, setCoupon] = useState(null);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, size, color, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product._id === product._id && item.size === size && item.color === color);
      if (existing) {
        return prev.map(item =>
          item.product._id === product._id && item.size === size && item.color === color
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, size, color, quantity, price: product.discountPrice || product.price }];
    });
    toast.success('Added to cart!');
  };

  const updateQuantity = (id, size, color, quantity) => {
    if (quantity < 1) return;
    setCartItems(prev =>
      prev.map(item =>
        item.product._id === id && item.size === size && item.color === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (id, size, color) => {
    setCartItems(prev => prev.filter(item => !(item.product._id === id && item.size === size && item.color === color)));
    toast.info('Removed from cart');
  };

  const applyCoupon = async (code) => {
    try {
      const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const res = await axios.post('/api/coupons/validate', { code, cartTotal: subtotal });
      if (res.data.valid) {
        setCoupon({ code: res.data.code, discount: res.data.discount });
        setDiscount(res.data.discount);
        toast.success(`Coupon applied! Saved ₨ ${res.data.discount}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid coupon');
    }
  };

  const clearCoupon = () => {
    setCoupon(null);
    setDiscount(0);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 5000 ? 0 : 200;
  const total = subtotal - discount + shipping;

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      updateQuantity,
      removeFromCart,
      subtotal,
      shipping,
      discount,
      total,
      applyCoupon,
      clearCoupon,
      coupon,
      cartCount: cartItems.reduce((sum, item) => sum + item.quantity, 0)
    }}>
      {children}
    </CartContext.Provider>
  );
};
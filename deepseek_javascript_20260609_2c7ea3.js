// frontend/src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Layout/ScrollToTop';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import UserAccountPage from './pages/UserAccountPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage';
import TermsPage from './pages/TermsPage';
import AdminLogin from './components/Admin/AdminLogin';
import Dashboard from './components/Admin/Dashboard';
import ProductManagement from './components/Admin/ProductManagement';
import CategoryManagement from './components/Admin/CategoryManagement';
import OrderManagement from './components/Admin/OrderManagement';
import CustomerManagement from './components/Admin/CustomerManagement';
import CouponManagement from './components/Admin/CouponManagement';
import BannerManagement from './components/Admin/BannerManagement';
import InventoryManagement from './components/Admin/InventoryManagement';
import SalesReports from './components/Admin/SalesReports';
import PrivateRoute from './components/common/PrivateRoute';
import AdminRoute from './components/common/AdminRoute';

function App() {
  return (
    <HelmetProvider>
      <ScrollToTop />
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/product/:slug" element={<ProductDetailsPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<PrivateRoute><CheckoutPage /></PrivateRoute>} />
        <Route path="/account/*" element={<PrivateRoute><UserAccountPage /></PrivateRoute>} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/privacy" element={<PrivacyPolicyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/admin/products" element={<AdminRoute><ProductManagement /></AdminRoute>} />
        <Route path="/admin/categories" element={<AdminRoute><CategoryManagement /></AdminRoute>} />
        <Route path="/admin/orders" element={<AdminRoute><OrderManagement /></AdminRoute>} />
        <Route path="/admin/customers" element={<AdminRoute><CustomerManagement /></AdminRoute>} />
        <Route path="/admin/coupons" element={<AdminRoute><CouponManagement /></AdminRoute>} />
        <Route path="/admin/banners" element={<AdminRoute><BannerManagement /></AdminRoute>} />
        <Route path="/admin/inventory" element={<AdminRoute><InventoryManagement /></AdminRoute>} />
        <Route path="/admin/reports" element={<AdminRoute><SalesReports /></AdminRoute>} />
      </Routes>
      <Footer />
    </HelmetProvider>
  );
}

export default App;
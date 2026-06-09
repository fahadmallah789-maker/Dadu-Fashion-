// frontend/src/components/Layout/Header.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa';

const Header = () => {
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${searchQuery}`);
      setSearchQuery('');
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-2xl md:text-3xl font-bold">
            <span className="text-black">DADU</span>
            <span className="gold-text"> FASHION</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link to="/" className="hover:text-gold transition">Home</Link>
            <Link to="/shop" className="hover:text-gold transition">Shop</Link>
            <Link to="/about" className="hover:text-gold transition">About</Link>
            <Link to="/contact" className="hover:text-gold transition">Contact</Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleSearch} className="hidden md:flex">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border rounded-l-full px-4 py-2 focus:outline-none focus:border-gold"
              />
              <button type="submit" className="bg-black text-white px-4 rounded-r-full hover:bg-gray-800">
                <FaSearch />
              </button>
            </form>
            
            <Link to="/cart" className="relative">
              <FaShoppingCart size={22} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            
            {user ? (
              <div className="relative group">
                <button className="flex items-center gap-1">
                  <FaUser size={20} />
                  <span className="hidden md:inline">{user.name.split(' ')[0]}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg hidden group-hover:block">
                  <Link to="/account/profile" className="block px-4 py-2 hover:bg-gray-100">My Account</Link>
                  <Link to="/account/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                  <button onClick={logout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">Logout</button>
                </div>
              </div>
            ) : (
              <Link to="/account/login" className="hidden md:block btn-primary py-2 px-4 text-sm">Login</Link>
            )}
            
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <form onSubmit={handleSearch} className="flex mb-4">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 border rounded-l-full px-4 py-2"
              />
              <button type="submit" className="bg-black text-white px-4 rounded-r-full">Search</button>
            </form>
            <nav className="flex flex-col gap-4">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>Home</Link>
              <Link to="/shop" onClick={() => setMobileMenuOpen(false)}>Shop</Link>
              <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
              {!user && <Link to="/account/login" onClick={() => setMobileMenuOpen(false)}>Login / Register</Link>}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
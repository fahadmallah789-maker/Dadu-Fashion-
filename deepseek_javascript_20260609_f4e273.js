// frontend/src/components/Admin/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { FaUsers, FaBox, FaShoppingCart, FaDollarSign } from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, totalProducts: 0, totalOrders: 0, totalRevenue: 0, recentOrders: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const token = localStorage.getItem('adminToken');
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      const res = await axios.get('/api/admin/dashboard');
      setStats(res.data);
      setLoading(false);
    };
    fetchStats();
  }, []);

  const cards = [
    { title: 'Total Users', value: stats.totalUsers, icon: <FaUsers />, color: 'bg-blue-500' },
    { title: 'Total Products', value: stats.totalProducts, icon: <FaBox />, color: 'bg-green-500' },
    { title: 'Total Orders', value: stats.totalOrders, icon: <FaShoppingCart />, color: 'bg-yellow-500' },
    { title: 'Revenue', value: `₨ ${stats.totalRevenue.toLocaleString()}`, icon: <FaDollarSign />, color: 'bg-gold' }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-black text-white min-h-screen p-6">
          <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>
          <nav className="space-y-3">
            <Link to="/admin" className="block py-2 px-4 hover:bg-gray-800 rounded">Dashboard</Link>
            <Link to="/admin/products" className="block py-2 px-4 hover:bg-gray-800 rounded">Products</Link>
            <Link to="/admin/categories" className="block py-2 px-4 hover:bg-gray-800 rounded">Categories</Link>
            <Link to="/admin/orders" className="block py-2 px-4 hover:bg-gray-800 rounded">Orders</Link>
            <Link to="/admin/customers" className="block py-2 px-4 hover:bg-gray-800 rounded">Customers</Link>
            <Link to="/admin/coupons" className="block py-2 px-4 hover:bg-gray-800 rounded">Coupons</Link>
            <Link to="/admin/banners" className="block py-2 px-4 hover:bg-gray-800 rounded">Banners</Link>
            <Link to="/admin/inventory" className="block py-2 px-4 hover:bg-gray-800 rounded">Inventory</Link>
            <Link to="/admin/reports" className="block py-2 px-4 hover:bg-gray-800 rounded">Reports</Link>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card, i) => (
              <div key={i} className="bg-white rounded-lg shadow p-6 flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">{card.title}</p>
                  <p className="text-2xl font-bold">{card.value}</p>
                </div>
                <div className={`${card.color} p-3 rounded-full text-white`}>{card.icon}</div>
              </div>
            ))}
          </div>

          {/* Recent Orders */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-3 text-left">Order ID</th>
                    <th className="p-3 text-left">Customer</th>
                    <th className="p-3 text-left">Date</th>
                    <th className="p-3 text-left">Total</th>
                    <th className="p-3 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order) => (
                    <tr key={order._id} className="border-b">
                      <td className="p-3">{order._id.slice(-8)}</td>
                      <td className="p-3">{order.user?.name || 'Guest'}</td>
                      <td className="p-3">{new Date(order.createdAt).toLocaleDate
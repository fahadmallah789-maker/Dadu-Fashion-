// frontend/src/components/Home/FeaturedProducts.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../common/ProductCard';
import Loader from '../common/Loader';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('/api/products/featured')
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;

  return (
    <section className="py-16 px-4 md:px-8 bg-gray-light">
      <div className="max-w-7xl mx-auto">
        <h2 className="section-title">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
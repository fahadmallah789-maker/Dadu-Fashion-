// frontend/src/components/common/ProductCard.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { FaShoppingCart, FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isInWishlist = wishlist.some(item => item._id === product._id);

  const discountPercent = product.discountPrice 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  return (
    <div className="card group relative">
      {discountPercent > 0 && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -{discountPercent}%
        </span>
      )}
      <button 
        onClick={() => toggleWishlist(product)}
        className="absolute top-2 right-2 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition"
      >
        {isInWishlist ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
      </button>
      <Link to={`/product/${product.slug}`}>
        <img 
          src={product.images?.[0] || 'https://via.placeholder.com/400x500'} 
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
        />
      </Link>
      <div className="p-4">
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-semibold text-lg mb-1 hover:text-gold transition">{product.name}</h3>
        </Link>
        <div className="flex items-center gap-2 mb-3">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold text-gold">₨ {product.discountPrice.toLocaleString()}</span>
              <span className="text-sm text-gray-400 line-through">₨ {product.price.toLocaleString()}</span>
            </>
          ) : (
            <span className="text-xl font-bold">₨ {product.price.toLocaleString()}</span>
          )}
        </div>
        <button 
          onClick={() => addToCart(product, product.sizes?.[0], product.colors?.[0]?.name, 1)}
          className="w-full btn-primary py-2 flex items-center justify-center gap-2"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
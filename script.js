/**
 * ============================================
 * DADU FASHION - Complete E-Commerce JavaScript
 * ============================================
 * Cart System | Product Rendering | UI Interactions
 * ============================================
 */

'use strict';

// ============================================
// PRODUCT DATA
// ============================================
const products = [
    // -- MEN --
    {
        id: 1,
        name: 'Premium Linen Blazer',
        category: 'men',
        price: 189.00,
        originalPrice: 249.00,
        image: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?w=600&q=80',
        badge: 'sale',
        rating: 4.8,
        reviews: 124
    },
    {
        id: 2,
        name: 'Classic Oxford Shirt',
        category: 'men',
        price: 89.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
        badge: 'new',
        rating: 4.6,
        reviews: 89
    },
    {
        id: 3,
        name: 'Slim Fit Chinos',
        category: 'men',
        price: 79.00,
        originalPrice: 110.00,
        image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=600&q=80',
        badge: 'sale',
        rating: 4.7,
        reviews: 203
    },
    {
        id: 4,
        name: 'Cashmere Blend Sweater',
        category: 'men',
        price: 149.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=600&q=80',
        badge: null,
        rating: 4.9,
        reviews: 67
    },
    {
        id: 5,
        name: 'Leather Bomber Jacket',
        category: 'men',
        price: 299.00,
        originalPrice: 399.00,
        image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600&q=80',
        badge: 'sale',
        rating: 4.8,
        reviews: 156
    },
    {
        id: 6,
        name: 'Italian Wool Suit',
        category: 'men',
        price: 599.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&q=80',
        badge: 'new',
        rating: 5.0,
        reviews: 42
    },
    {
        id: 7,
        name: 'Denim Jacket',
        category: 'men',
        price: 119.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?w=600&q=80',
        badge: null,
        rating: 4.5,
        reviews: 188
    },
    {
        id: 8,
        name: 'Polo Shirt Collection',
        category: 'men',
        price: 59.00,
        originalPrice: 85.00,
        image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=80',
        badge: 'sale',
        rating: 4.4,
        reviews: 312
    },
    // -- WOMEN --
    {
        id: 9,
        name: 'Silk Evening Gown',
        category: 'women',
        price: 349.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
        badge: 'new',
        rating: 4.9,
        reviews: 78
    },
    {
        id: 10,
        name: 'Tailored Blazer Dress',
        category: 'women',
        price: 199.00,
        originalPrice: 279.00,
        image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=600&q=80',
        badge: 'sale',
        rating: 4.7,
        reviews: 145
    },
    {
        id: 11,
        name: 'Cashmere Cardigan',
        category: 'women',
        price: 129.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1434389677669-e08b4cda3a2d?w=600&q=80',
        badge: null,
        rating: 4.6,
        reviews: 93
    },
    {
        id: 12,
        name: 'High-Waist Trousers',
        category: 'women',
        price: 89.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1594633312681-68c0256e1e5c?w=600&q=80',
        badge: 'new',
        rating: 4.5,
        reviews: 211
    },
    {
        id: 13,
        name: 'Floral Midi Dress',
        category: 'women',
        price: 139.00,
        originalPrice: 189.00,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&q=80',
        badge: 'sale',
        rating: 4.8,
        reviews: 267
    },
    {
        id: 14,
        name: 'Leather Handbag',
        category: 'women',
        price: 249.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=80',
        badge: null,
        rating: 4.9,
        reviews: 134
    },
    // -- KIDS --
    {
        id: 15,
        name: 'Mini Denim Set',
        category: 'kids',
        price: 49.00,
        originalPrice: 69.00,
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=600&q=80',
        badge: 'sale',
        rating: 4.7,
        reviews: 89
    },
    {
        id: 16,
        name: 'Cotton Polo & Shorts',
        category: 'kids',
        price: 39.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=600&q=80',
        badge: null,
        rating: 4.5,
        reviews: 156
    },
    {
        id: 17,
        name: 'Girls Party Dress',
        category: 'kids',
        price: 59.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=600&q=80',
        badge: 'new',
        rating: 4.8,
        reviews: 73
    },
    {
        id: 18,
        name: 'Toddler Hoodie Set',
        category: 'kids',
        price: 34.00,
        originalPrice: 49.00,
        image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?w=600&q=80',
        badge: 'sale',
        rating: 4.6,
        reviews: 201
    },
    // -- ACCESSORIES --
    {
        id: 19,
        name: 'Gold Chain Necklace',
        category: 'accessories',
        price: 79.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
        badge: 'new',
        rating: 4.9,
        reviews: 98
    },
    {
        id: 20,
        name: 'Aviator Sunglasses',
        category: 'accessories',
        price: 129.00,
        originalPrice: 179.00,
        image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&q=80',
        badge: 'sale',
        rating: 4.7,
        reviews: 234
    },
    {
        id: 21,
        name: 'Leather Belt',
        category: 'accessories',
        price: 49.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&q=80',
        badge: null,
        rating: 4.5,
        reviews: 312
    },
    {
        id: 22,
        name: 'Silver Watch',
        category: 'accessories',
        price: 199.00,
        originalPrice: 259.00,
        image: 'https://images.unsplash.com/photo-

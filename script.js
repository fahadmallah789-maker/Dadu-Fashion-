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
            id: 22,
        name: 'Silver Watch',
        category: 'accessories',
        price: 199.00,
        originalPrice: 259.00,
        image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&q=80',
        badge: 'sale',
        rating: 4.8,
        reviews: 176
    },
    {
        id: 23,
        name: 'Silk Scarf',
        category: 'accessories',
        price: 69.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?w=600&q=80',
        badge: 'new',
        rating: 4.6,
        reviews: 88
    },
    {
        id: 24,
        name: 'Leather Wallet',
        category: 'accessories',
        price: 89.00,
        originalPrice: null,
        image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=600&q=80',
        badge: null,
        rating: 4.7,
        reviews: 245
    }
];

// ============================================
// CART SYSTEM
// ============================================
let cart = JSON.parse(localStorage.getItem('dadufashion_cart')) || [];

function saveCart() {
    localStorage.setItem('dadufashion_cart', JSON.stringify(cart));
    updateCartBadge();
}

function updateCartBadge() {
    const badge = document.getElementById('cartBadge');
    if (badge) {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        badge.textContent = totalItems;
        badge.style.display = totalItems > 0 ? 'flex' : 'none';
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }
    saveCart();
    showToast(`${product.name} added to cart!`);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
}

function updateQuantity(productId, delta) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        saveCart();
    }
}

function getCartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}

// ============================================
// TOAST NOTIFICATION
// ============================================
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toastMessage');
    if (!toast || !toastMsg) return;

    toastMsg.textContent = message;
    toast.classList.add('show');

    clearTimeout(toast._timeout);
    toast._timeout = setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

// ============================================
// PRODUCT CARD RENDERER
// ============================================
function createProductCard(product) {
    const stars = Math.floor(product.rating);
    const starHTML = Array(5).fill().map((_, i) =>
        `<i class="fas fa-star${i < stars ? '' : i < product.rating ? '-half-alt' : '-o'}"></i>`
    ).join('');

    const badgeHTML = product.badge
        ? `<span class="product-badge ${product.badge}">${product.badge === 'new' ? 'New Arrival' : 'Sale'}</span>`
        : '';

    const originalPriceHTML = product.originalPrice
        ? `<span class="original-price">$${product.originalPrice.toFixed(2)}</span>`
        : '';

    return `
        <div class="product-card" data-id="${product.id}" data-category="${product.category}" data-price="${product.price}">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${badgeHTML}
                <div class="product-actions">
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                        <i class="fas fa-shopping-bag"></i> Add to Cart
                    </button>
                </div>
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    ${starHTML}
                    <span>(${product.reviews})</span>
                </div>
                <div class="product-price">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    ${originalPriceHTML}
                </div>
            </div>
        </div>
    `;
}

// ============================================
// RENDER PRODUCTS
// ============================================
function renderProducts(productsArray, containerId = 'productsGrid') {
    const container = document.getElementById(containerId);
    if (!container) return;
    container.innerHTML = productsArray.map(createProductCard).join('');
}

function renderFeaturedProducts() {
    const featured = products.filter(p => p.badge === 'new' || p.badge === 'sale').slice(0, 8);
    renderProducts(featured, 'featuredProductsGrid');
}

// ============================================
// FILTER & SORT
// ============================================
let activeCategory = 'all';
let activeSort = 'default';

function filterProducts() {
    let filtered = [...products];

    if (activeCategory !== 'all') {
        filtered = filtered.filter(p => p.category === activeCategory);
    }

    switch (activeSort) {
        case 'price-asc':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-desc':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'name-asc':
            filtered.sort((a, b) => a.name.localeCompare(b.name));
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        default:
            break;
    }

    renderProducts(filtered, 'productsGrid');
}

function setCategory(category) {
    activeCategory = category;
    document.querySelectorAll('.filter-pill').forEach(pill => {
        pill.classList.toggle('active', pill.dataset.category === category);
    });
    filterProducts();
}

function setSort(sortValue) {
    activeSort = sortValue;
    filterProducts();
}

// ============================================
// SEARCH
// ============================================
function performSearch(query) {
    if (!query.trim()) {
        filterProducts();
        return;
    }
    const terms = query.toLowerCase().split(' ');
    const results = products.filter(p => {
        const searchText = `${p.name} ${p.category}`.toLowerCase();
        return terms.every(t => searchText.includes(t));
    });
    const grid = document.getElementById('productsGrid');
    if (grid) {
        renderProducts(results, 'productsGrid');
        if (results.length === 0) {
            grid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <i class="fas fa-search" style="font-size: 3rem; color: var(--gray-300); margin-bottom: 16px;"></i>
                    <h3 style="font-family: var(--font-primary); font-size: 1.5rem; margin-bottom: 8px;">No results found</h3>
                    <p style="color: var(--gray-500);">Try a different search term or browse categories.</p>
                </div>
            `;
        }
    }
}

// ============================================
// UI EVENT HANDLERS
// ============================================
function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchClose = document.getElementById('searchClose');
    const searchInput = document.getElementById('searchInput');
    const navbar = document.getElementById('navbar');

    // Hamburger toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.closest('.nav-center').classList.toggle('active');
        });
    }

    // Search toggle
    if (searchToggle && searchBar) {
        searchToggle.addEventListener('click', () => {
            searchBar.classList.toggle('active');
            if (searchBar.classList.contains('active')) {
                setTimeout(() => searchInput?.focus(), 300);
            }
        });
    }

    if (searchClose && searchBar) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
            if (searchInput) searchInput.value = '';
        });
    }

    // Search on products page
    if (searchInput && document.getElementById('productsGrid')) {
        let searchTimeout;
        searchInput.addEventListener('input', () => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => performSearch(searchInput.value), 300);
        });
    }

    // Navbar scroll effect
    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar..toggle('scrolled', window.scrollY > 50);
        });
    }

    // Close mobile menu on link click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');


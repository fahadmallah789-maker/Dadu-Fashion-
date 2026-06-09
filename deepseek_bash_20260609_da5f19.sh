dadu-fashion/
├── backend/
│   ├── config/
│   │   ├── db.js
│   │   └── auth.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── orderController.js
│   │   ├── categoryController.js
│   │   ├── couponController.js
│   │   ├── bannerController.js
│   │   ├── userController.js
│   │   ├── reviewController.js
│   │   └── adminController.js
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   ├── adminMiddleware.js
│   │   └── uploadMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Category.js
│   │   ├── Order.js
│   │   ├── Review.js
│   │   ├── Coupon.js
│   │   ├── Banner.js
│   │   └── Admin.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── orderRoutes.js
│   │   ├── categoryRoutes.js
│   │   ├── couponRoutes.js
│   │   ├── bannerRoutes.js
│   │   ├── userRoutes.js
│   │   ├── reviewRoutes.js
│   │   └── adminRoutes.js
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── emailService.js
│   ├── .env
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   └── ScrollToTop.jsx
│   │   │   ├── Home/
│   │   │   │   ├── HeroSlider.jsx
│   │   │   │   ├── FeaturedProducts.jsx
│   │   │   │   ├── NewArrivals.jsx
│   │   │   │   ├── BestSellers.jsx
│   │   │   │   ├── CategoriesSection.jsx
│   │   │   │   ├── CustomerReviews.jsx
│   │   │   │   └── Newsletter.jsx
│   │   │   ├── Shop/
│   │   │   │   ├── ProductGrid.jsx
│   │   │   │   ├── ProductFilters.jsx
│   │   │   │   ├── SearchBar.jsx
│   │   │   │   └── Pagination.jsx
│   │   │   ├── Product/
│   │   │   │   ├── ProductImages.jsx
│   │   │   │   ├── ProductInfo.jsx
│   │   │   │   └── RelatedProducts.jsx
│   │   │   ├── Cart/
│   │   │   │   ├── CartItem.jsx
│   │   │   │   ├── CartSummary.jsx
│   │   │   │   └── CouponInput.jsx
│   │   │   ├── Checkout/
│   │   │   │   ├── ShippingForm.jsx
│   │   │   │   ├── OrderSummary.jsx
│   │   │   │   └── PaymentOptions.jsx
│   │   │   ├── User/
│   │   │   │   ├── LoginForm.jsx
│   │   │   │   ├── RegisterForm.jsx
│   │   │   │   ├── ForgotPassword.jsx
│   │   │   │   ├── Profile.jsx
│   │   │   │   └── OrderHistory.jsx
│   │   │   ├── Admin/
│   │   │   │   ├── AdminLogin.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ProductManagement.jsx
│   │   │   │   ├── CategoryManagement.jsx
│   │   │   │   ├── OrderManagement.jsx
│   │   │   │   ├── CustomerManagement.jsx
│   │   │   │   ├── CouponManagement.jsx
│   │   │   │   ├── BannerManagement.jsx
│   │   │   │   ├── InventoryManagement.jsx
│   │   │   │   └── SalesReports.jsx
│   │   │   ├── common/
│   │   │   │   ├── Loader.jsx
│   │   │   │   ├── Alert.jsx
│   │   │   │   └── Modal.jsx
│   │   │   └── Wishlist/
│   │   │       └── WishlistButton.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ShopPage.jsx
│   │   │   ├── ProductDetailsPage.jsx
│   │   │   ├── CartPage.jsx
│   │   │   ├── CheckoutPage.jsx
│   │   │   ├── UserAccountPage.jsx
│   │   │   ├── ContactPage.jsx
│   │   │   ├── AboutPage.jsx
│   │   │   ├── PrivacyPolicyPage.jsx
│   │   │   └── TermsPage.jsx
│   │   ├── context/
│   │   │   ├── CartContext.jsx
│   │   │   ├── AuthContext.jsx
│   │   │   ├── WishlistContext.jsx
│   │   │   └── AdminContext.jsx
│   │   ├── services/
│   │   │   ├── api.js
│   │   │   └── axiosConfig.js
│   │   ├── styles/
│   │   │   ├── globals.css
│   │   │   └── theme.css
│   │   ├── utils/
│   │   │   └── constants.js
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── index.css
│   ├── .env
│   └── package.json
├── README.md
└── .gitignore
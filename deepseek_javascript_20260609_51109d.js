// frontend/src/pages/HomePage.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';
import HeroSlider from '../components/Home/HeroSlider';
import FeaturedProducts from '../components/Home/FeaturedProducts';
import NewArrivals from '../components/Home/NewArrivals';
import BestSellers from '../components/Home/BestSellers';
import CategoriesSection from '../components/Home/CategoriesSection';
import CustomerReviews from '../components/Home/CustomerReviews';
import Newsletter from '../components/Home/Newsletter';

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>Dadu Fashion - Premium Clothing Store in Pakistan</title>
        <meta name="description" content="Shop the latest fashion trends for men, women, and kids at Dadu Fashion. Premium quality clothing with exclusive designs." />
      </Helmet>
      <HeroSlider />
      <FeaturedProducts />
      <CategoriesSection />
      <NewArrivals />
      <BestSellers />
      <CustomerReviews />
      <Newsletter />
    </>
  );
};

export default HomePage;
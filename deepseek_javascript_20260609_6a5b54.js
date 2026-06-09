// frontend/src/components/Home/HeroSlider.jsx
import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HeroSlider = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    axios.get('/api/banners').then(res => setBanners(res.data));
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
    fade: true
  };

  const defaultBanners = [
    { image: 'https://via.placeholder.com/1920x600/000000/D4AF37?text=Dadu+Fashion+Premium+Collection', title: 'Summer Collection 2024', subtitle: 'Up to 50% Off', buttonText: 'Shop Now', link: '/shop' },
    { image: 'https://via.placeholder.com/1920x600/D4AF37/000000?text=Exclusive+Designs', title: 'Exclusive Designs', subtitle: 'Limited Edition', buttonText: 'Explore', link: '/shop' }
  ];

  const slides = banners.length ? banners : defaultBanners;

  return (
    <div className="relative overflow-hidden">
      <Slider {...settings}>
        {slides.map((banner, index) => (
          <div key={index} className="relative h-[400px] md:h-[500px] lg:h-[600px]">
            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">{banner.title}</h1>
                <p className="text-xl md:text-2xl mb-8">{banner.subtitle}</p>
                <Link to={banner.link || '/shop'} className="btn-gold inline-block">
                  {banner.buttonText || 'Shop Now'}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroSlider;
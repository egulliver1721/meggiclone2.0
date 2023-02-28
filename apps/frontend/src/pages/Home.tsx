import React, { useState, useEffect } from 'react';
import '../styles/App.scss';
import heroImage from '../images/meggicover.jpg';
import Header from '../components/header';
import Navigation from '../components/Navigation';
import Product from '../components/product';
import rainbowThumbnail from '../images/rainbowThumbnail.png';
import blueThumbnail from '../images/blueThumbnail.png';
import pinkThumbnail from '../images/pinkThumbnail.png';
import wildAnimalThumbnail from '../images/wildAnimalThumbnail.png';

const tagData = [
  {
    pattern: 'rainbowTag',
    itemName: 'Rainbow Tag',
    thumbnail: rainbowThumbnail,
    price: '13.20',
    quantity: 1,
  },
  {
    pattern: 'blueTag',
    itemName: 'Blue Floral Tag',
    thumbnail: blueThumbnail,
    price: '13.20',
    quantity: 1,
  },
  {
    pattern: 'pinkTag',
    itemName: 'Pink Floral Tag',
    thumbnail: pinkThumbnail,
    price: '13.20',
    quantity: 1,
  },
  {
    pattern: 'wildAnimalTag',
    itemName: 'Wild Animal Tag',
    thumbnail: wildAnimalThumbnail,
    price: '13.20',
    quantity: 1,
  },
];

const Home = () => {
  const [tagPattern, setTagPattern] = useState();
  const [cartItems, setCartItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const exists = cartItems.some((item) => item.pattern === tagPattern);
    if (!exists) {
      const selectedTag = tagData.find((tag) => tag.pattern === tagPattern);
      if (selectedTag) {
        setCartItems([...cartItems, selectedTag]);
      }
    }
  };

  const onPatternClick = (e) => {
    e.preventDefault();
    setTagPattern((prevPattern) => e.target.getAttribute('data-image'));
  };
  return (
    <div className='App'>
      <div className='heroContainer'>
        <Header heroImage={heroImage} />
      </div>
      <Product
        onPatternClick={onPatternClick}
        handleSubmit={handleSubmit}
        pattern={tagPattern}
      />
    </div>
  );
};

export default Home;

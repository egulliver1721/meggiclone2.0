import { useState } from 'react';
import '../styles/App.scss';
import Product from '../components/product';
import rainbowThumbnail from '../images/rainbowThumbnail.png';
import blueThumbnail from '../images/blueThumbnail.png';
import pinkThumbnail from '../images/pinkThumbnail.png';
import wildAnimalThumbnail from '../images/wildAnimalThumbnail.png';
import Hero from '../components/hero';
import { Outlet } from 'react-router-dom';
import { atom, useAtom } from 'jotai';

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

// useAtom
const cartItemsAtom = atom([]);

const Home = () => {
  const [tagPattern, setTagPattern] = useState('rainbowTag');
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const exists = cartItems.some((item) => item.pattern === tagPattern);
    if (!exists) {
      const selectedTag = tagData.find((tag) => tag.pattern === tagPattern);
      if (selectedTag) {
        setCartItems([...cartItems, selectedTag]);
      }
    }
  };

  const onPatternClick = (pattern: string) => {
    setTagPattern(pattern);
  };

  return (
    <div className="App">
      <Hero />
      <Outlet />
      <Product onPatternClick={onPatternClick} handleSubmit={handleSubmit} pattern={tagPattern} />
    </div>
  );
};

export default Home;

import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Banner from '../components/banner';
import Navbar from '../components/navbar';

const Root = () => {
  const [cartItems, setCartItems] = useState([]);
  const [tagPattern, setTagPattern] = useState(null);

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

  useEffect(() => {
    console.log(cartItems);
  }, [cartItems]);

  function handleIncrement(pattern) {
    const updatedCartItems = cartItems.map((tag) => {
      if (tag.pattern === pattern) {
        return { ...tag, quantity: tag.quantity + 1 };
      } else {
        return tag;
      }
    });
    setCartItems(updatedCartItems);
  }

  const handleDecrement = (pattern) => {
    const updatedCartItems = cartItems.map((tag) => {
      if (tag.pattern === pattern) {
        const newQuantity = Math.max(1, tag.quantity - 1);
        return { ...tag, quantity: newQuantity };
      } else {
        return tag;
      }
    });
    setCartItems(updatedCartItems);
  };

  const handleRemove = (pattern) => {
    const removeCartItem = cartItems.filter((tag) => tag.pattern !== pattern);
    setCartItems(removeCartItem);
  };
  return (
    <>
      <section>
        <Banner text="Free Shipping Across Australia" />
        <Navbar />
      </section>
      <section>
        <Outlet />
      </section>
      <footer>
        <h1> Footer </h1>
      </footer>
    </>
  );
};

export default Root;

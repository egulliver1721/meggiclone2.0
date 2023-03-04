import { useState, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Banner from '../components/banner';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import style from './root.module.scss';

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
    <div className={style.root}>
      <section>
        <Banner text="Free Shipping Across Australia" />
        <Navbar />
      </section>
      <section className={style.container}>
        <Outlet />
      </section>
      <Footer />
    </div>
  );
};

export default Root;

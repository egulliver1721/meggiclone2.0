import React, { useState } from 'react';
import CartDropdown from './cartDropdown';

export default function Navigation(props) {
  const { cartItems, handleDecrement, handleIncrement, handleRemove } = props;
  const [isCartOpen, setCartOpen] = useState(false);

  function openCartDropdown() {
    setCartOpen((prevState) => !isCartOpen);
  }

  return (
    <nav className="navigation">
      <h1 className="logoText marginNavBar">MEGGI</h1>
      <h4 className="marginNavBar">
        Shop Nappy Bag Tags
        <span className="material-symbols-rounded expand">expand_more</span>
      </h4>
      {cartItems && (
        <span className="material-symbols-rounded cartIcon" onClick={openCartDropdown}>
          shopping_cart
          {numberOfCartItems > 0 && <span className="itemsInCart">{numberOfCartItems}</span>}
        </span>
      )}
      {cartItems && (
        <CartDropdown
          isCartOpen={isCartOpen}
          cartItems={cartItems}
          decrement={handleDecrement}
          increment={handleIncrement}
          remove={handleRemove}
        />
      )}
    </nav>
  );
}

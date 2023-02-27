import React from "react";

import CartDropdown from "./cartDropdown.js";

export default function Navigation(props) {
  const { cartItems, handleDecrement, handleIncrement, handleRemove } = props;
  const numberOfCartItems = cartItems.length;
  const [isCartOpen, setCartOpen] = React.useState(false);

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
      <span
        className="material-symbols-rounded cartIcon"
        onClick={openCartDropdown}
      >
        shopping_cart
        {numberOfCartItems > 0 && (
          <span className="itemsInCart">{numberOfCartItems}</span>
        )}
      </span>
      <CartDropdown
        isCartOpen={isCartOpen}
        cartItems={cartItems}
        decrement={handleDecrement}
        increment={handleIncrement}
        remove={handleRemove}
      />
    </nav>
  );
}

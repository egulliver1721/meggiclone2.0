import React from "react";
import "./App.css";
import heroImage from "./meggicover.jpg";
import Header from "./header.js";
import Navigation from "./navigation.js";
import Product from "./product.js";
import rainbowThumbnail from "./images/rainbowThumbnail.png";
import blueThumbnail from "./images/blueThumbnail.png";
import pinkThumbnail from "./images/pinkThumbnail.png";
import wildAnimalThumbnail from "./images/wildAnimalThumbnail.png";

const tagData = [
  {
    pattern: "rainbowTag",
    itemName: "Rainbow Tag",
    thumbnail: rainbowThumbnail,
    price: "13.20",
    quantity: 1,
  },
  {
    pattern: "blueTag",
    itemName: "Blue Floral Tag",
    thumbnail: blueThumbnail,
    price: "13.20",
    quantity: 1,
  },
  {
    pattern: "pinkTag",
    itemName: "Pink Floral Tag",
    thumbnail: pinkThumbnail,
    price: "13.20",
    quantity: 1,
  },
  {
    pattern: "wildAnimalTag",
    itemName: "Wild Animal Tag",
    thumbnail: wildAnimalThumbnail,
    price: "13.20",
    quantity: 1,
  },
];

function App() {
  const [tagPattern, setTagPattern] = React.useState("rainbowTag");
  const [cartItems, setCartItems] = React.useState([]);

  function onPatternClick(e) {
    e.preventDefault();
    setTagPattern((prevPattern) => e.target.getAttribute("data-image"));
  }

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

  React.useEffect(() => {
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

  function handleDecrement(pattern) {
    const updatedCartItems = cartItems.map((tag) => {
      if (tag.pattern === pattern) {
        const newQuantity = Math.max(1, tag.quantity - 1);
        return { ...tag, quantity: newQuantity };
      } else {
        return tag;
      }
    });
    setCartItems(updatedCartItems);
  }

  function handleRemove(pattern) {
    const removeCartItem = cartItems.filter((tag) => tag.pattern !== pattern);
    setCartItems(removeCartItem);
  }

  return (
    <div className="App">
      <section className="center banner">
        <p>Free shipping within Australia</p>
      </section>
      <section className="section-width-standard">
        <Navigation
          cartItems={cartItems}
          setCartItems={setCartItems}
          handleDecrement={handleDecrement}
          handleIncrement={handleIncrement}
          handleRemove={handleRemove}
        />
      </section>
      <div className="heroContainer">
        <Header heroImage={heroImage} />
      </div>
      <Product
        onPatternClick={onPatternClick}
        handleSubmit={handleSubmit}
        pattern={tagPattern}
      />
    </div>
  );
}

export default App;

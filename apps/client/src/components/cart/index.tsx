import { useState } from 'react';
import { useAtom } from 'jotai';
import { cartItemsAtom } from '../../pages/Home';
import axios from 'axios';
import stripePromise from '../../utils/stripe';
import style from './cart.module.scss';
import React from 'react';

interface Item {
  id: number;
  pattern: string;
  itemName: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

const CART_ITEMS_KEY = 'cartItems';

export const getNumItemsFromCart = () => {
  const cartItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]');
  let numItems = 0;

  if (cartItems && cartItems.length) {
    for (const item of cartItems) {
      numItems += item.quantity;
    }
  }

  return numItems;
};

const Cart = (): JSX.Element => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const initialItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]');
  const [itemsInCart, setItemsInCart] = useAtom(cartItemsAtom, initialItems);

  console.log(getNumItemsFromCart());

  // update cart items in jotai state
  const updateCartItems = (callback: (prevItems: Item[]) => Item[]) => {
    setItemsInCart((prevItems: Item[]) => {
      const updatedItems = callback(prevItems);
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  // checkout handler for stripe
  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    const stripe = await stripePromise;
    if (!stripe) {
      console.error('Stripe is not available');
      setIsCheckoutLoading(false);
      return;
    }
    // to do learn axios
    const response = await axios.post('/create-checkout-session', {
      cartItems: itemsInCart,
    });
    const session = await response.data;
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setIsCheckoutLoading(false);
  };

  const handleIncrementQuantity = (itemIndex: number) => {
    updateCartItems((prevItems: Item[]) =>
      prevItems.map((item, index) => (index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item)),
    );
  };

  const handleDecrementQuantity = (itemIndex: number) => {
    updateCartItems((prevItems: Item[]) =>
      prevItems.map((item, index) =>
        index === itemIndex
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : 1,
            }
          : item,
      ),
    );
  };

  const handleRemoveFromCart = (itemIndex: number) => {
    updateCartItems((prevItems: Item[]) => prevItems.filter((item, index) => index !== itemIndex));
  };

  return (
    <div className={style.cart}>
      <div className={style.container}>
        {itemsInCart.length > 0 ? (
          <>
            <ul>
              {itemsInCart.map((item, index) => (
                <li key={index}>
                  <div className="bold">{item.itemName}</div>
                  <div>
                    ${item.price} x {item.quantity}{' '}
                  </div>
                  <div>
                    {' '}
                    <button onClick={() => handleIncrementQuantity(index)}>+</button>{' '}
                    <button onClick={() => handleDecrementQuantity(index)}>-</button>{' '}
                    <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                  </div>
                </li>
              ))}
            </ul>
            <button className={style.cartCheckoutBtn} onClick={handleCheckout} disabled={isCheckoutLoading}>
              {isCheckoutLoading ? 'Loading...' : 'Checkout'}
            </button>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

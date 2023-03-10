import { useState } from 'react';
import { atom, useAtom } from 'jotai';
import axios from 'axios';
import stripePromise from '../../utils/stripe';
import style from './cart.module.scss';

interface Item {
  name: string;
  price: number;
  quantity: number;
}

const cartAtom = atom<Item[]>([]);

const Cart = (): JSX.Element => {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);
  const [itemsInCart, setItemsInCart] = useAtom(cartAtom);

  //update cart items in jotai state
  const updateCartItems = (callback: (prevItems: Item[]) => Item[]) => {
    setItemsInCart((prevItems: Item[]) => {
      const updatedItems = callback(prevItems);
      localStorage.setItem('cartItems', JSON.stringify(updatedItems));
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
                  {item.name} - ${item.price} x {item.quantity}{' '}
                  <button onClick={() => handleIncrementQuantity(index)}>+</button>{' '}
                  <button onClick={() => handleDecrementQuantity(index)}>-</button>{' '}
                  <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
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

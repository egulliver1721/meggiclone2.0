import { useAtom } from 'jotai';
import { cartItemsAtom } from '../../pages/Home';
import style from './cart.module.scss';
import { Link } from 'react-router-dom';
import React, { useCallback } from 'react';

interface Item {
  id: number;
  pattern: string;
  itemName: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

const CART_ITEMS_KEY = 'cartItems';

const Cart = (): JSX.Element => {
  const initialItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]');
  const [itemsInCart, setItemsInCart] = useAtom(cartItemsAtom, initialItems);

  // update cart items in jotai state
  const updateCartItems = useCallback(
    (callback: (prevItems: Item[]) => Item[]) => {
      setItemsInCart((prevItems: Item[]) => {
        const updatedItems = callback(prevItems);
        localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updatedItems));
        return updatedItems;
      });
    },
    [setItemsInCart],
  );

  const handleIncrementQuantity = useCallback(
    (itemIndex: number) => {
      updateCartItems((prevItems: Item[]) =>
        prevItems.map((item, index) => (index === itemIndex ? { ...item, quantity: item.quantity + 1 } : item)),
      );
    },
    [updateCartItems],
  );

  const handleDecrementQuantity = useCallback(
    (itemIndex: number) => {
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
    },
    [updateCartItems],
  );

  const handleRemoveFromCart = useCallback(
    (itemIndex: number) => {
      updateCartItems((prevItems: Item[]) => prevItems.filter((item, index) => index !== itemIndex));
    },
    [updateCartItems],
  );

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
            <Link to="/summary">
              <button className={style.cartCheckoutBtn}>Summary</button>
            </Link>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default Cart;

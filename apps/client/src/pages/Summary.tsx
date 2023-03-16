import React from 'react';
import { cartItemsAtom } from '../pages/Home';
import { useAtom } from 'jotai';

const CART_ITEMS_KEY = 'cartItems';

interface Item {
  id: number;
  pattern: string;
  itemName: string;
  thumbnail: string;
  price: number;
  quantity: number;
}

const CartSummary = (): JSX.Element => {
  const initialItems = JSON.parse(localStorage.getItem(CART_ITEMS_KEY) || '[]');
  const [itemsInCart, setItemsInCart] = useAtom(cartItemsAtom, initialItems);

  // update cart items in jotai state
  const updateCartItems = (callback: (prevItems: Item[]) => Item[]) => {
    setItemsInCart((prevItems: Item[]) => {
      const updatedItems = callback(prevItems);
      localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleRemoveFromCart = (itemIndex: number) => {
    updateCartItems((prevItems: Item[]) => prevItems.filter((item, index) => index !== itemIndex));
  };

  return (
    <div>
      {itemsInCart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <h2>Cart Summary</h2>
          <ul>
            {itemsInCart.map((item, index) => (
              <li key={index}>
                <div>{item.itemName}</div>
                <div>
                  ${item.price} x {item.quantity}
                </div>
                <div>
                  <button onClick={() => handleRemoveFromCart(index)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CartSummary;

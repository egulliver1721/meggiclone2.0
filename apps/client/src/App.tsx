import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';
import { Home, Error, Checkout, Root, Contact, Terms, Privacy, About, Signup } from './pages';
import { useAtom } from 'jotai';
import { cartItemsAtom } from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index={true} element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<Error />} />
      <Route path="Contact" element={<Contact />} />
      <Route path="Terms" element={<Terms />} />
      <Route path="Privacy" element={<Privacy />} />
      <Route path="About" element={<About />} />
      <Route path="Signup" element={<Signup />} />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);

const CART_ITEMS_KEY = 'cartItems';

const App = () => {
  const [itemsInCart, setItemsInCart] = useAtom(cartItemsAtom);

  console.log('itemsInCart', itemsInCart);

  useEffect(() => {
    const storedItems = localStorage.getItem(CART_ITEMS_KEY);
    if (storedItems) {
      setItemsInCart(JSON.parse(storedItems));
    }
  }, [setItemsInCart]);
  return <RouterProvider router={router} />;
};

export default App;

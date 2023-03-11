import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';
import { Home, Error, Checkout, Root, Contact, Terms, Privacy, About, Signup } from './pages';

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

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

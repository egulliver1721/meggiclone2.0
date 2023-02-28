import React, { useState, useEffect } from 'react';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
  Link,
} from 'react-router-dom';
import Home from './pages/Home';
import Error from './pages/Error';
import Checkout from './pages/Checkout';
import Root from './pages/Root';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
    >
      <Route
        index={true}
        element={<Home />}
      />
      <Route
        path='checkout'
        element={<Checkout />}
      />
      <Route
        path='*'
        element={<Error />}
      />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

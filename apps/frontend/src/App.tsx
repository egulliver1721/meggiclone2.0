import { RouterProvider } from 'react-router-dom';
import { createRoutesFromElements, createBrowserRouter, Route } from 'react-router-dom';
import { Home, Error, Checkout, Root } from './pages';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index={true} element={<Home />} />
      <Route path="checkout" element={<Checkout />} />
      <Route path="*" element={<Error />} />
    </Route>,
  ),
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;

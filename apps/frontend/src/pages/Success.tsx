import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

const Success = () => {
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const sessionId = new URLSearchParams(location.search).get('session_id');
    if (sessionId) {
      // Do something with the session ID, e.g. mark the order as paid
      history.push('/checkout/success');
    } else {
      history.push('/checkout/cart');
    }
  }, [location.search, history]);

  return (
    <div>
      <h1>Success!</h1>
    </div>
  );
}

export default Success;
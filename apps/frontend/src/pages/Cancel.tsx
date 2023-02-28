import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const Cancel = () => {
  const history = useHistory();

  useEffect(() => {
    history.push('/checkout/cart');
  }, [history]);

  return (
    <div>
      <h1>Payment cancelled</h1>
    </div>
  );
}

export default Cancel;
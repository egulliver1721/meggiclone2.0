import { useState } from 'react';
import stripePromise from '../utils/stripe';

export default function CartDropdown(props) {
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  // Create Checkout Sessions from body params.
  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    const stripe = await stripePromise;
    const response = await fetch('/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cartItems: props.cartItems }),
    });
    const session = await response.json();
    await stripe.redirectToCheckout({
      sessionId: session.id,
    });
    setIsCheckoutLoading(false);
  };

  const itemsInCart = props.cartItems.map((item, index) => {
    return (
      <div className="cartItemContainer" key={index}>
        <div className="cartItemThumbnailContainer">
          <img className="cartItemThumbnail" src={item.thumbnail} alt="item thumbnail" />
        </div>
        <div className="cartItemDetails">
          <div className="cartItemName">{item.itemName}</div>
          <div className="cartItemQtyContainer">
            <span className="cartItemQuantity">
              <button className="cartQtyBtn" onClick={() => props.decrement(item.pattern)}>
                -
              </button>
              <span className="cartQty"> {item.quantity} </span>
              <button className="cartQtyBtn" onClick={() => props.increment(item.pattern)}>
                +
              </button>
            </span>
          </div>
        </div>
        <div className="cartItemPrice">
          {(item.price * item.quantity).toLocaleString('en-AU', {
            minimumFractionDigits: 2,
            currency: 'AUD',
            style: 'currency',
          })}
        </div>
        <div className="cartItemRemoveContainer">
          <button className="cartItemRemove" onClick={() => props.remove(item.pattern)}>
            x
          </button>
        </div>
      </div>
    );
  });

  const total = props.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const totalRounded = total.toFixed(2);

  return (
    <div className="cartDropdown" style={props.isCartOpen ? { display: 'block' } : { display: 'none' }}>
      {itemsInCart.length > 0 ? (
        <div>
          {itemsInCart}
          <div className="cartTotalContainer" style={totalRounded > 0 ? { display: 'grid' } : { display: 'none' }}>
            <div className="cartTotalWord">Sub-total:</div>
            <div className="cartTotal">${totalRounded}</div>
          </div>
        </div>
      ) : (
        <div className="cartEmpty">Your cart is empty</div>
      )}

      {itemsInCart.length > 0 && (
        <button className="cartCheckoutBtn" onClick={handleCheckout} disabled={isCheckoutLoading}>
          {isCheckoutLoading ? 'Loading...' : 'Checkout'}
        </button>
      )}
    </div>
  );
}

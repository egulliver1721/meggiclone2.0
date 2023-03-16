import React, { useState } from 'react';
import styles from './cookies.module.scss';

function CookiesNotification() {
  const [cookiesAccepted, setCookiesAccepted] = useState(localStorage.getItem('cookiesAccepted') === 'true');
  const [showNotification, setShowNotification] = useState(!cookiesAccepted);

  const handleAccept = () => {
    localStorage.setItem('cookiesAccepted', 'true');
    setCookiesAccepted(true);
    setShowNotification(false);
  };

  const handleDecline = () => {
    setShowNotification(false);
  };

  return (
    <>
      {showNotification && !cookiesAccepted && (
        <div className={styles.container}>
          <p className={styles.text}>This website uses cookies to ensure you get the best experience on our website.</p>
          <div className={styles.wrapper}>
            <button className={styles.accept} onClick={handleAccept}>
              Accept
            </button>
            <button className={styles.decline} onClick={handleDecline}>
              Decline
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default CookiesNotification;

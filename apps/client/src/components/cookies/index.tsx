import React, { useState } from 'react';
import styles from './cookies.module.scss';

function CookiesNotification() {
  const [showNotification, setShowNotification] = useState(true);

  const handleAccept = () => {
    setShowNotification(false);
    // Set a cookie to remember user preference
    document.cookie = 'cookiesAccepted=true; max-age=2592000; path=/';
  };

  const handleDecline = () => {
    setShowNotification(false);
  };

  const cookiesAccepted = document.cookie.split('; ').find((cookie) => cookie.startsWith('cookiesAccepted='));

  if (cookiesAccepted || !showNotification) {
    return null;
  }

  return (
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
  );
}

export default CookiesNotification;

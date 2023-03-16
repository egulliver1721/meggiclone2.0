import style from './wishlist.module.scss';
import { useAtom } from 'jotai/index';
import { loggedInAtom } from '../user';
import { Link } from 'react-router-dom';
import React from 'react';

const Index = () => {
  const [loggedIn, setLoggedIn] = useAtom(loggedInAtom);

  return (
    <div className={style.wishlist}>
      <div className={style.container}>
        {loggedIn ? (
          <h1>Wishlist</h1>
        ) : (
          <>
            <p>Sign in to view</p>
            <Link to="/login">Login</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;

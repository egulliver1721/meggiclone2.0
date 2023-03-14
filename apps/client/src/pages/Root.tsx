import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import style from './root.module.scss';
import React from 'react';
import CookiesNotification from '../components/cookies';
import ScrollToTop from '../components/totop';

const Root = () => {
  return (
    <>
      <CookiesNotification />
      <ScrollToTop />

      <div className={style.root}>
        <header>
          <Navbar />
        </header>
        <section className={style.container}>
          <Outlet />
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Root;

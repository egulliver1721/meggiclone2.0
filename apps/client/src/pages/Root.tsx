import { Outlet } from 'react-router-dom';
import Banner from '../components/banner';
import Navbar from '../components/navbar';
import Footer from '../components/footer';
import style from './root.module.scss';
import React from 'react';
import CookiesNotification from '../components/cookies';

const Root = () => {
  return (
    <>
      <CookiesNotification />
      <div className={style.root}>
        <header>
          <Banner text="Free Shipping Across Australia" />
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

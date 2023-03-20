import { Link } from 'react-router-dom';
import style from './footer.module.scss';
import React from 'react';
import { BsInstagram, BsLinkedin, BsFacebook } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer>
      <div className={style.grid}>
        <div className={style.griditem}>
          <p className={style.logo}>M.</p>
        </div>
        <div className={style.griditem}>
          <div className={style.socialIcons}>
            <BsInstagram className={style.socialIcons} />
            <BsLinkedin className={style.socialIcons} />
            <BsFacebook className={style.socialIcons} />
          </div>
        </div>
        <div className={style.griditem}>
          <Link className={style.link} to="/Terms">
            Terms and Conditions
          </Link>
          <Link className={style.link} to="/Privacy">
            Privacy Policy
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import style from './navbar.module.scss';
import gsap from 'gsap';
import { FiHeart, FiMenu, FiMoon, FiShoppingBag, FiSun, FiUser } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Cart from '../cart';
import { atom, useAtom } from 'jotai';

const themeAtom = atom('light');

const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);
  const [openCart, setOpenCart] = useState(false);
  const [openUser, setOpenUser] = useState(false);
  const [openWishlist, setOpenWishlist] = useState(false);
  // jotai use atom
  const [theme, setTheme] = useAtom(themeAtom);
  console.log(theme);

  const handleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  const menuRef = useRef(null);
  const itemsRef = useRef(null);
  const cartRef = useRef(null);

  const toggleUser = () => {
    setOpenUser(!openUser);
  };

  const toggleWishlist = () => {
    setOpenWishlist(!openWishlist);
  };

  const toggleCart = () => {
    setOpenCart(!openCart);
  };

  useEffect(() => {
    if (openMenu) {
      const handleOutsideClick = (e: MouseEvent) => {
        if (cartRef.current && !cartRef.current.contains(e.target as Node)) {
          console.log('clicked outside');
          toggleMenu();
        }
      };
      document.addEventListener('click', handleOutsideClick);
      return () => {
        document.removeEventListener('click', handleOutsideClick);
      };
    }
  }, [openMenu]);

  const toggleMenu = () => {
    setOpenMenu(!openMenu);

    if (!openMenu) {
      const tl = gsap.timeline();
      tl.to(menuRef.current, { duration: 0.5, height: '100vh' });
      tl.to(itemsRef.current, { duration: 0.5, opacity: 1, display: 'flex', scale: 1.1 }, '-=0.5');
      tl.to(itemsRef.current, { duration: 0.5, y: 0, scale: 1 });
    }
  };

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const tl = gsap.timeline();
    tl.to(itemsRef.current, { duration: 0.3, opacity: 0, scale: 1 });
    tl.to(menuRef.current, { duration: 0.3, height: '0vh' }, '-=0.5');
    tl.to(itemsRef.current, { display: 'none' });
    setOpenMenu(false);
  };

  return (
    // Navbar
    <nav className={style.navbar}>
      <div className={style.container}>
        <div className={style.containerleft}>
          <span onClick={toggleMenu} className={style.menuIcon}>
            <FiMenu />
          </span>
        </div>
        <div className={style.containercenter}>
          <a href="/">
            <span className={style.logo}>MEGGI</span>
          </a>
        </div>
        <div className={style.containerright}>
          <FiHeart onClick={toggleWishlist} />
          <FiShoppingBag onClick={toggleCart} />
          {
            // ternary operator
            theme === 'light' ? <FiMoon onClick={handleTheme} /> : <FiSun onClick={handleTheme} />
          }
          <FiUser onClick={toggleUser} />
        </div>
      </div>
      {/* Full-screen menu */}
      <div ref={menuRef} className={style.fullscreen}>
        <div ref={itemsRef} className={style.items}>
          <Link to="/" onClick={handleLinkClick}>
            Home
          </Link>
          <Link to="/shop" onClick={handleLinkClick}>
            Shop
          </Link>
          <Link to="/about" onClick={handleLinkClick}>
            About
          </Link>
          <Link to="/contact" onClick={handleLinkClick}>
            Contact
          </Link>
        </div>
      </div>
      {/* Cart */}
      {openCart && <Cart />}

      {/* <Wishlist /> */}
      {openWishlist && <Wishlist />}
    </nav>
  );
};

export default Navbar;

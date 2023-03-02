import React, { useRef } from 'react';
import gsap from 'gsap';
import anime from 'animejs';
import style from './hero.module.scss';

// create hero component with a background image and a title
const Hero = () => {
  // create a reference to the hero element
  const heroRef = React.useRef(null);

  // create a reference to the title element
  const titleRef = React.useRef(null);

  // create a reference to the subtitle element
  const subtitleRef = React.useRef(null);

  // create a reference to the button element
  const buttonRef = React.useRef(null);

  // create animation on load
  React.useEffect(() => {
    // create a timeline
    const tl = gsap.timeline();

    // add animation to the timeline
    tl.fromTo(titleRef.current, { opacity: 0, y: 20 }, { duration: 1, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.5');
    tl.fromTo(
      subtitleRef.current,
      { opacity: 0, y: 20 },
      { duration: 1, opacity: 1, y: 0, ease: 'power2.out' },
      '-=0.5',
    );
    tl.fromTo(buttonRef.current, { opacity: 0, y: 20 }, { duration: 1, opacity: 1, y: 0, ease: 'power2.out' }, '-=0.5');
  }, []);

  return (
    <div ref={heroRef} className={style.hero}>
      <h1 ref={titleRef} className={style.title}>
        Handmade Tags
      </h1>
      <p ref={subtitleRef} className={style.subtitle}>
        Handmade tags for your handmade products
      </p>
      <button ref={buttonRef} className={style.button}>
        Shop Now
      </button>
    </div>
  );
};

export default Hero;

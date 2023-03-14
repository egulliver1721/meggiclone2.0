import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { FaArrowUp } from 'react-icons/fa';
import style from './scrollToTop.module.scss';

const ScrollToTop = () => {
  const [showScroll, setShowScroll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScrollTop = () => {
      if (!showScroll && window.pageYOffset > 200) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 200) {
        setShowScroll(false);
      }
    };

    window.addEventListener('scroll', checkScrollTop);
    return () => window.removeEventListener('scroll', checkScrollTop);
  }, [showScroll]);

  const handleScrollTop = () => {
    gsap.to(scrollRef.current, {
      onComplete: () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
    });
  };

  return (
    <div ref={scrollRef} className={`${style.scrollToTop} ${showScroll ? style.show : ''}`} onClick={handleScrollTop}>
      <FaArrowUp />
    </div>
  );
};

export default ScrollToTop;

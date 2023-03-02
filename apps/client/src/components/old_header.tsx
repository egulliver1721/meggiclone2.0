import React, { useEffect, useLayoutEffect } from 'react';
import anime from 'animejs';

interface HeaderProps {
  heroImage: string;
}

const Header = (props: HeaderProps) => {
  useLayoutEffect(() => {
    const heading = document.querySelector('.heading');
    const description = document.querySelector('.description');
    const heroImage = document.querySelector('.heroImage');
    const button = document.querySelector('.button');

    const headingAnimation = anime({
      targets: heading,
      translateY: [10, 0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 1000,
    });

    const descriptionAnimation = anime({
      targets: description,
      translateY: [10, 0],
      opacity: [0, 1],
      easing: 'easeOutQuad',
      duration: 1000,
      delay: 500,
    });

    if (heroImage && button) {
      button.addEventListener('mouseenter', () => {
        anime({
          targets: heroImage,
          scale: 1.1,
          easing: 'easeOutQuad',
          duration: 500,
        });
      });

      button.addEventListener('mouseleave', () => {
        anime({
          targets: heroImage,
          scale: 1,
          easing: 'easeOutQuad',
          duration: 500,
        });
      });
    }

    // Cleanup function
    return () => {
      headingAnimation.pause();
      descriptionAnimation.pause();
    };
  }, []);
  return (
    <>
      <div className="imageContainer">
        <div
          className="heroImage"
          style={{
            '--img': `url(${props.heroImage}), 
      linear-gradient(#e66465, #9198e5)`,
          }}
        >
          <h1 className="heading">We're getting organised over here.</h1>
          <p className="description">The ultimate organisation tool for you and your family.</p>
          <div className="buttonDiv center">
            <a className="button" href="www.google.com">
              Shop Tags
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

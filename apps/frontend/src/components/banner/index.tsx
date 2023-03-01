import React from 'react';
import styles from './banner.module.scss';

interface BannerProps {
  text: string;
}

const Banner = ({ text }: BannerProps) => {
  return (
    <div className={styles.banner}>
      <p>{text}</p>
    </div>
  );
};

export default Banner;

import React from 'react';
import styles from './header.module.scss';

interface ButtonProps {
  to: string;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ to, onClick, children }: ButtonProps) => {
  return (
    <a href={to} className={styles.button} onClick={onClick}>
      {children}
    </a>
  );
};

export default Button;

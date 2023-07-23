import React from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.Header}>
      <FaBowlFood className={styles.icon} />
    </header>
  );
}

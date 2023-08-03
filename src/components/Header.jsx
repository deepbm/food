import React from 'react';
import { SiIfood } from 'react-icons/si';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.Header}>
      <SiIfood className={styles.icon} />
      <p className={styles.text}>Food Wiki</p>
    </header>
  );
}

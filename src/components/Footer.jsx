import React from 'react';
import { SiIfood } from 'react-icons/si';
import styles from './Footer.module.css';
import LocaleSelect from './LocaleSelect';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__container}>
        <div className={styles.Footer__logo}>
          <SiIfood className={styles.icon} />
          <p className={styles.text}>Food Wiki</p>
        </div>
        <LocaleSelect />
      </div>
    </footer>
  );
}

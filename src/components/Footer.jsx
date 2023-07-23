import React from 'react';
import { FaBowlFood } from 'react-icons/fa6';
import styles from './Footer.module.css';
import LocaleSelect from './LocaleSelect';

export default function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className={styles.Footer__container}>
        <FaBowlFood className={styles.icon} />
        <LocaleSelect />
      </div>
    </footer>
  );
}

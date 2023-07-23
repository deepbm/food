import React from 'react';
import styles from './LocaleSelect.module.css';
import { useLocale } from '../contexts/LocaleContext';

export default function LocaleSelect() {
  const { locale, setLocale } = useLocale();

  return (
    <select
      className={styles.LocaleSelect}
      value={locale}
      onChange={e => setLocale(e.target.value)}
    >
      <option value='ko'>한국어</option>
      <option value='en'>English</option>
    </select>
  );
}

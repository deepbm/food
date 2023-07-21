import React from 'react';
import { useLocale } from '../contexts/LocaleContext';

export default function LocaleSelect() {
  const { locale, setLocale } = useLocale();
  return (
    <select value={locale} onChange={e => setLocale(e.target.value)}>
      <option value='ko'>한국어</option>
      <option value='en'>English</option>
    </select>
  );
}

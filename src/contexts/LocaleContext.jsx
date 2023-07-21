import { createContext, useContext, useState } from 'react';

const LocaleContext = createContext();

export function LocaleProvider({ initialValue = 'ko', children }) {
  const [locale, setLocale] = useState(initialValue);
  return <LocaleContext.Provider value={{ locale, setLocale }}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);

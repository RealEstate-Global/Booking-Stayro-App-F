"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { ar, type Dictionary } from "@/i18n/dictionaries/ar";
import { en } from "@/i18n/dictionaries/en";
import {
  defaultLocale,
  isLocale,
  localeDirection,
  localeStorageKey,
  type Locale,
} from "@/i18n/config";

const dictionaries: Record<Locale, Dictionary> = { ar, en };

interface LanguageContextValue {
  locale: Locale;
  dir: "rtl" | "ltr";
  t: Dictionary;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);

  // Restore the visitor's saved preference after hydration.
  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(localeStorageKey);
      if (isLocale(stored) && stored !== defaultLocale) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- SSR-safe locale hydration: the stored choice can only be read on the client
        setLocaleState(stored);
      }
    } catch {
      // localStorage unavailable — keep the default locale.
    }
  }, []);

  // Keep <html lang/dir> and storage in sync with the active locale.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = locale;
    root.dir = localeDirection[locale];
    try {
      window.localStorage.setItem(localeStorageKey, locale);
    } catch {
      // ignore write failures (private mode, etc.)
    }
  }, [locale]);

  const setLocale = useCallback((next: Locale) => setLocaleState(next), []);
  const toggleLocale = useCallback(
    () => setLocaleState((prev) => (prev === "ar" ? "en" : "ar")),
    []
  );

  const value: LanguageContextValue = {
    locale,
    dir: localeDirection[locale],
    t: dictionaries[locale],
    setLocale,
    toggleLocale,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a <LanguageProvider>");
  }
  return ctx;
}

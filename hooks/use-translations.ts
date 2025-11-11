// hooks/use-translations.ts
"use client";

import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n';

const LOCALE_STORAGE_KEY = 'kiwiz_locale';

export function useTranslations() {
  const [locale, setLocale] = useState<Locale>('en');
  const [translations, setTranslations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        // Get saved locale
        const savedLocale = (localStorage.getItem(LOCALE_STORAGE_KEY) || 'en') as Locale;
        setLocale(savedLocale);

        // Load translations
        const messages = await import(`@/locales/${savedLocale}.json`);
        setTranslations(messages.default);
      } catch (error) {
        console.error('Failed to load translations:', error);
        // Fallback to English
        const messages = await import(`@/locales/en.json`);
        setTranslations(messages.default);
      } finally {
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  // Helper function to get nested translation
  const t = (key: string): string => {
    if (!translations) return key;
    
    const keys = key.split('.');
    let value: any = translations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key; // Return key if not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };

  return { t, locale, translations, isLoading };
}

// Helper to get current locale without translations
export function useLocale() {
  const [locale, setLocale] = useState<Locale>('en');

  useEffect(() => {
    const savedLocale = (localStorage.getItem(LOCALE_STORAGE_KEY) || 'en') as Locale;
    setLocale(savedLocale);
  }, []);

  return locale;
}


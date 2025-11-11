"use client";

import { useState, useEffect } from "react";
import { locales, localeNames, type Locale } from "@/i18n";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

const LOCALE_STORAGE_KEY = 'kiwiz_locale';

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentLocale, setCurrentLocale] = useState<Locale>('en');

  // Load saved locale preference
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(LOCALE_STORAGE_KEY) as Locale;
      if (saved && locales.includes(saved)) {
        setCurrentLocale(saved);
      }
    }
  }, []);

  const switchLocale = (newLocale: Locale) => {
    setCurrentLocale(newLocale);
    localStorage.setItem(LOCALE_STORAGE_KEY, newLocale);
    setIsOpen(false);
    
    // Reload page to apply new locale
    window.location.reload();
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
        <span className="sm:hidden">{currentLocale.toUpperCase()}</span>
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
            <div className="py-2">
              {locales.map((locale) => (
                <button
                  key={locale}
                  onClick={() => switchLocale(locale)}
                  className={`w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    locale === currentLocale
                      ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 font-medium"
                      : "text-gray-700 dark:text-gray-200"
                  }`}
                >
                  {localeNames[locale]}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}


import { translations } from "@/i18n";
import { useLanguageStore } from "@/i18n/store/languageStore";

type Language = keyof typeof translations;

/**
 * Returns a `t(key)` function that is purely derived from the Zustand
 * language state. No i18n.locale mutation needed — the lookup goes directly
 * into the imported translations object, so React re-renders instantly
 * whenever the language changes in the store.
 *
 * Keys use dot notation, e.g. "commodityTable.tableTitle"
 */
export const useTranslation = () => {
  const language = useLanguageStore((s) => s.language) as Language;

  const isRTL = language === "ur" || language === "sin";

  const t = (key: string): string => {
    const keys = key.split(".");

    let result: any = translations[language];

    for (const k of keys) {
      result = result?.[k];
    }

    return typeof result === "string" ? result : key;
  };

  return {
    t,
    language,
    isRTL,
  };
};

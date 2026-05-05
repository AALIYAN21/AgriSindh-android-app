// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { create } from "zustand";
// import { createJSONStorage, persist } from "zustand/middleware";
// import i18n from "../index";

// type Language = "en" | "ur";

// type State = {
//     language: Language;
//     toggleLanguage: () => void;
//     setLanguage: (lang: Language) => void;
// };

// export const useLanguageStore = create<State>()(
//     persist(
//         (set, get) => ({
//             language: "en",

//             setLanguage: (lang) => {
//                 i18n.locale = lang;
//                 set({ language: lang });
//             },

//             toggleLanguage: () => {
//                 const current = get().language;
//                 const next = current === "en" ? "ur" : "en";
//                 i18n.locale = next;
//                 set({ language: next });
//             },
//         }),
//         {
//             name: "language-preference", // AsyncStorage key
//             storage: createJSONStorage(() => AsyncStorage),
//             // Only persist the language value, not the action functions
//             partialize: (state) => ({ language: state.language }),
//             // Sync i18n.locale after AsyncStorage rehydrates on app start
//             onRehydrateStorage: () => (state) => {
//                 if (state?.language) {
//                     i18n.locale = state.language;
//                 }
//             },
//         }
//     )
// );

import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import i18n from "../index";

type Language = "en" | "ur" | "sin";

type State = {
  language: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
};

const languageOrder: Language[] = ["en", "ur", "sin"];

export const useLanguageStore = create<State>()(
  persist(
    (set, get) => ({
      language: "en",

      setLanguage: (lang) => {
        i18n.locale = lang;
        set({ language: lang });
      },

      toggleLanguage: () => {
        const current = get().language;
        const currentIndex = languageOrder.indexOf(current);
        const next = languageOrder[(currentIndex + 1) % languageOrder.length];

        i18n.locale = next;
        set({ language: next });
      },
    }),
    {
      name: "language-preference",
      storage: createJSONStorage(() => AsyncStorage),

      partialize: (state) => ({ language: state.language }),

      onRehydrateStorage: () => (state) => {
        if (state?.language) {
          i18n.locale = state.language;
        }
      },
    },
  ),
);

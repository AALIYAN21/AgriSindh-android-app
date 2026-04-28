import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import enCommodityTable from "./locales/en/commodityTable";
import urCommodityTable from "./locales/ur/commodityTable";

import enDataSync from "./locales/en/dataSync";
import urDataSync from "./locales/ur/dataSync";


const i18n = new I18n();

// Translations object — also exported for direct reactive lookup in useTranslation
export const translations = {
    en: {
        commodityTable: enCommodityTable,
        dataSync: enDataSync,
    },

    ur: {
        commodityTable: urCommodityTable,
        dataSync: urDataSync,
    },
} as const;

i18n.translations = translations;

// device language
i18n.locale = Localization.getLocales()[0]?.languageCode || "en";

// fallback
i18n.enableFallback = true;

export default i18n;
import * as Localization from "expo-localization";
import { I18n } from "i18n-js";

import enCommodityTable from "./locales/en/commodityTable";
import urCommodityTable from "./locales/ur/commodityTable";

import enDataSync from "./locales/en/dataSync";
import urDataSync from "./locales/ur/dataSync";

import enLogin from "./locales/en/login";
import urLogin from "./locales/ur/login";

import enStatus from "./locales/en/statusModal";
import urStatus from "./locales/ur/statusModal";

import enCategories from "./locales/en/categories";
import urCategories from "./locales/ur/categories";

import enListCommodities from "./locales/en/listCommodities";
import urListCommodities from "./locales/ur/listCommodities";

import enProfile from "./locales/en/profile";
import urProfile from "./locales/ur/profile";

import enForgotPassword from "./locales/en/forgotPassword";
import urForgotPassword from "./locales/ur/forgotPassword";

import enVerifyOTP from "./locales/en/verifyOTP";
import urVerifyOTP from "./locales/ur/verifyOTP";

import enNewPassword from "./locales/en/newPassword";
import urNewPassword from "./locales/ur/newPassword";

import enTabs from "./locales/en/tabs";
import urTabs from "./locales/ur/tabs";


const i18n = new I18n();

// Translations object — also exported for direct reactive lookup in useTranslation
export const translations = {
    en: {
        commodityTable: enCommodityTable,
        dataSync: enDataSync,
        login: enLogin,
        status: enStatus,
        categories: enCategories,
        listCommodities: enListCommodities,
        profile: enProfile,
        forgotPassword: enForgotPassword,
        verifyOTP: enVerifyOTP,
        newPassword: enNewPassword,
        tabs: enTabs,
    },

    ur: {
        commodityTable: urCommodityTable,
        dataSync: urDataSync,
        login: urLogin,
        status: urStatus,
        categories: urCategories,
        listCommodities: urListCommodities,
        profile: urProfile,
        forgotPassword: urForgotPassword,
        verifyOTP: urVerifyOTP,
        newPassword: urNewPassword,
        tabs: urTabs,
    },
} as const;

i18n.translations = translations;

// device language
i18n.locale = Localization.getLocales()[0]?.languageCode || "en";

// fallback
i18n.enableFallback = true;

export default i18n;
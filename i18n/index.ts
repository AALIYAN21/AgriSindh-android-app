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

import enVolume from "./locales/en/volume";
import urVolume from "./locales/ur/volume";

import sinCategories from "./locales/sin/categories";
import sinCommodityTable from "./locales/sin/commodityTable";
import sinDataSync from "./locales/sin/dataSync";
import sinForgotPassword from "./locales/sin/forgotPassword";
import sinListCommodities from "./locales/sin/listCommodities";
import sinLogin from "./locales/sin/login";
import sinNewPassword from "./locales/sin/newPassword";
import sinProfile from "./locales/sin/profile";
import sinStatus from "./locales/sin/statusModal";
import sinTabs from "./locales/sin/tabs";
import sinVerifyOTP from "./locales/sin/verifyOTP";
import sinVolume from "./locales/sin/volume";

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
    volume: enVolume,
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
    volume: urVolume,
  },

  sin: {
    commodityTable: sinCommodityTable,
    dataSync: sinDataSync,
    login: sinLogin,
    status: sinStatus,
    categories: sinCategories,
    listCommodities: sinListCommodities,
    profile: sinProfile,
    forgotPassword: sinForgotPassword,
    verifyOTP: sinVerifyOTP,
    newPassword: sinNewPassword,
    tabs: sinTabs,
    volume: sinVolume,
  },
} as const;

i18n.translations = translations;

// device language
i18n.locale = Localization.getLocales()[0]?.languageCode || "en";

// fallback
i18n.enableFallback = true;

export const getCurrentLanguage = () => {
  return i18n.locale;
};

export default i18n;

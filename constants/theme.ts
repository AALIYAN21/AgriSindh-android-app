import { Platform } from "react-native";

const primaryGreen = '#1F5D2B';
const lightBackground = '#F6F7FB';
const cardBackground = '#EDEDED';
const mutedText = '#7A9E8C';

export const Colors = {
  light: {
    text: '#1A1A1A',
    background: lightBackground,
    card: cardBackground,
    primary: primaryGreen,

    tint: primaryGreen,
    icon: mutedText,

    tabIconDefault: mutedText,
    tabIconSelected: '#FFFFFF',

    border: '#D9D9D9',
    notification: '#FF3B30',
  },

  dark: {
    text: '#ECEDEE',
    background: '#121212',
    card: '#1E1E1E',
    primary: '#4CAF6A',

    tint: '#4CAF6A',
    icon: '#9BA1A6',

    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',

    border: '#2C2C2C',
    notification: '#FF453A',
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  android: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif-medium',
    mono: 'monospace',
  },
  default: {
    sans: 'sans-serif',
    serif: 'serif',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Segoe UI', sans-serif",
    mono: "Menlo, Monaco, Consolas, 'Courier New', monospace",
  },
});
import { CustomTheme } from '@/src/interfaces/theme';
import { DefaultTheme, DarkTheme as RNDarkTheme } from '@react-navigation/native';

export const LightTheme: CustomTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        accent: '#ff784f',
        background: '#ffffff',
        border: '#e5e5e5',
        card: '#ffffff',
        notification: '#ff5722',
        primary: '#f5f3ff',
        secondary: '#7037eb',
        text: '#1a1a1a',
    },
};

export const DarkTheme: CustomTheme = {
    ...RNDarkTheme,
    dark: true,
    colors: {
        accent: '#ff784f',
        background: '#121212',
        border: '#333333',
        card: '#1a1a2e',
        notification: '#ff5722',
        primary: '#1a1a2e',
        secondary: '#5a3fc0',
        text: '#eaeaea',
    },
};

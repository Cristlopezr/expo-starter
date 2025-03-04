import { CustomTheme } from '@/src/interfaces/theme';
import { DefaultTheme, DarkTheme as RNDarkTheme } from '@react-navigation/native';

export const LightTheme: CustomTheme = {
    ...DefaultTheme,
    dark: false,
    colors: {
        accentForeground: 'rgb(255, 255, 255)',
        accent: 'rgb(240, 98, 146)',
        background: 'rgb(245, 245, 250)',
        border: 'rgb(207, 216, 220)',
        card: 'rgb(255, 255, 255)',
        destructiveForeground: 'rgb(255, 255, 255)',
        destructive: 'rgb(229, 57, 53)',
        notification: 'rgb(255, 214, 102)',
        primaryForeground: 'rgb(255, 255, 255)',
        primary: 'rgb(98, 0, 238)',
        secondaryForeground: 'rgb(255, 255, 255)',
        secondary: 'rgb(3, 155, 229)',
        successForeground: 'rgb(255, 255, 255)',
        success: 'rgb(0, 200, 83)',
        text: 'rgb(33, 33, 33)',
    },
};

export const DarkTheme: CustomTheme = {
    ...RNDarkTheme,
    dark: true,
    colors: {
        accentForeground: 'rgb(255, 255, 255)',
        accent: 'rgb(236, 64, 122)',
        background: 'rgb(18, 18, 24)',
        border: 'rgb(66, 66, 77)',
        card: 'rgb(30, 30, 40)',
        destructiveForeground: 'rgb(255, 255, 255)',
        destructive: 'rgb(244, 67, 54)',
        notification: 'rgb(255, 183, 77)',
        primaryForeground: 'rgb(255, 255, 255)',
        primary: 'rgb(179, 157, 219)',
        secondaryForeground: 'rgb(255, 255, 255)',
        secondary: 'rgb(79, 195, 247)',
        successForeground: 'rgb(255, 255, 255)',
        success: 'rgb(102, 187, 106)',
        text: 'rgb(224, 224, 230)',
    },
};

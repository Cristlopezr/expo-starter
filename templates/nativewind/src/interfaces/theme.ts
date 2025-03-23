import { Theme } from '@react-navigation/native';

export type CustomTheme = Theme & {
    colors: Record<ColorNames, string>;
};
type Expand<T> = { [K in keyof T]: T[K] };

type CustomColors = {
    accent: string;
    accentForeground: string;
    backgroundForeground: string;
    cardForeground: string;
    destructive: string;
    destructiveForeground: string;
    primaryForeground: string;
    secondary: string;
    secondaryForeground: string;
    success: string;
    successForeground: string;
};

type ColorNames = Expand<keyof Theme['colors'] | keyof CustomColors>;

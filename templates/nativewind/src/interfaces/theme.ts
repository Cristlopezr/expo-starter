import { Theme } from '@react-navigation/native';

export type CustomTheme = Theme & {
    colors: Record<ColorNames, string>;
};

type Expand<T> = { [K in keyof T]: T[K] };

type CustomColors = {
    accent: string;
    secondary: string;
};

type ColorNames = Expand<keyof Theme['colors'] | keyof CustomColors>;

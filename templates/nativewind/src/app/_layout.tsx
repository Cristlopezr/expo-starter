import '../global.css';
import { ThemeProvider } from '@react-navigation/native';
import { StackNavigator } from '../navigator/stack-navigator';
import { useColorScheme } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, LightTheme } from '../config/theme/theme-options';

export default function RootLayout() {
    const colorScheme = useColorScheme();

    return (
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : LightTheme}>
            <StackNavigator />
            <StatusBar style="auto" />
        </ThemeProvider>
    );
}

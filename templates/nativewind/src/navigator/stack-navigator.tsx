import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { CustomTheme } from '../interfaces/theme';

export const StackNavigator = () => {
    const { colors } = useTheme() as CustomTheme;

    return (
        <Stack
            screenOptions={{
                statusBarBackgroundColor: colors.background,
                headerStyle: {
                    backgroundColor: colors.background,
                },
                contentStyle: {
                    backgroundColor: colors.background,
                },
            }}
        >
            <Stack.Screen name='index' />
        </Stack>
    );
};

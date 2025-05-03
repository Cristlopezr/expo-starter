import { useTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { CustomTheme } from '../interfaces/theme';
import { getHeaderTitle, Header } from '@react-navigation/elements';

export const StackNavigator = () => {
    const { colors } = useTheme() as CustomTheme;

    return (
        <Stack
            screenOptions={{
                header: ({ options, route }) => <Header {...options} title={getHeaderTitle(options, route.name)} />,
                headerStyle: {
                    backgroundColor: colors.background,
                },
                contentStyle: {
                    backgroundColor: colors.background,
                },
            }}
        >
            <Stack.Screen name="index" />
        </Stack>
    );
};

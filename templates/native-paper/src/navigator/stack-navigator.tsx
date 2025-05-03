import { getHeaderTitle, Header } from '@react-navigation/elements';
import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function StackNavigator() {
    const { colors } = useTheme();

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
                headerTitleStyle: {
                    color: colors.onBackground,
                },
            }}
        >
            <Stack.Screen name='index' />
        </Stack>
    );
}

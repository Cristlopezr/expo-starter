import { Stack } from 'expo-router';
import { useTheme } from 'react-native-paper';

export default function StackNavigator() {
    const { colors } = useTheme();

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
}

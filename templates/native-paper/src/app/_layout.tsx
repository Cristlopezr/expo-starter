import { PaperProvider } from 'react-native-paper';
import StackNavigator from '../navigator/stack-navigator';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
    return (
        <PaperProvider>
            <StackNavigator />
            <StatusBar style='auto' />
        </PaperProvider>
    );
}

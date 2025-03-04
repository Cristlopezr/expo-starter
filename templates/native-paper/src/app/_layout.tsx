import { PaperProvider } from 'react-native-paper';
import StackNavigator from '../navigator/stack-navigator';

export default function RootLayout() {
    return (
        <PaperProvider>
            <StackNavigator />
        </PaperProvider>
    );
}

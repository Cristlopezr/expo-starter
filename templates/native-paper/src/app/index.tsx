import { Appearance, Text, View } from 'react-native';
import { Button, useTheme } from 'react-native-paper';
export default function Index() {
    const { colors } = useTheme();
    const onChangeTheme = () => {
        Appearance.setColorScheme(Appearance.getColorScheme() === 'light' ? 'dark' : 'light');
    };

    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text style={{ color: colors.onBackground }}>Edit app/index.tsx to edit this screen.</Text>
            <Button onPress={onChangeTheme} mode='contained'>
                Change theme
            </Button>
        </View>
    );
}

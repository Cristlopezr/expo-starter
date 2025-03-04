import { Appearance, Text, View } from 'react-native';
import Button from '../components/button';

export default function Index() {
    const onChangeTheme = () => {
        Appearance.setColorScheme(Appearance.getColorScheme() === 'light' ? 'dark' : 'light');
    };

    return (
        <View className='h-full justify-center items-center'>
            <Text className='text-text'>Edit index.tsx</Text>

            <Button onPress={onChangeTheme}>
                <Text className='text-primary-foreground'>Change theme</Text>
            </Button>
        </View>
    );
}

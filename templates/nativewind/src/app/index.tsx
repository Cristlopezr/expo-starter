import { Appearance, Pressable, Text, View } from 'react-native';

export default function Index() {
    const onChangeTheme = () => {
        Appearance.setColorScheme(Appearance.getColorScheme() === 'light' ? 'dark' : 'light');
    };

    return (
        <View className='h-full justify-center items-center'>
            <Text className='text-text'>Edit index.tsx</Text>

            <Pressable onPress={onChangeTheme}>
                <Text className='text-text'>Change Theme</Text>
            </Pressable>
        </View>
    );
}

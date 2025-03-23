import Button from "@/src/components/ui/button";
import { Appearance } from "react-native";
import View from "../components/ui/view";
import Text from "../components/ui/text";

export default function Index() {
  const onChangeTheme = () => {
    Appearance.setColorScheme(Appearance.getColorScheme() === "light" ? "dark" : "light");
  };

  return (
    <View className="h-full items-center justify-center">
      <Text className="text-text">Edit index.tsx</Text>

      <Button onPress={onChangeTheme}>
        <Text className="text-primary-foreground">Change theme</Text>
      </Button>
    </View>
  );
}

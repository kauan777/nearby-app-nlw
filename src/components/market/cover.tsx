import { ImageBackground, View } from "react-native";
import { router } from "expo-router";
import { Button } from "@/components/button";
import { IconArrowLeft } from "@tabler/icons-react-native";

interface Props {
  uri: string;
}

export function Cover({ uri }: Readonly<Props>) {
  return (
    <ImageBackground
      source={{ uri }}
      className="w-full h-[242px] -mb-8 bg-gray-200"
    >
      <View className="p-6 pt-14">
        <Button className="w-10 h-10" onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>
    </ImageBackground>
  );
}

import { View } from "react-native";
import { Welcome } from "@/components/welcome";
import { Steps } from "@/components/steps";
import { Button } from "@/components/button";
import { router } from "expo-router";

export default function Index() {
  return (
    <View className="flex-1 p-10 gap-10">
      <Welcome />
      <Steps />
      <Button onPress={() => router.push("/home")}>
        <Button.Title>Começar</Button.Title>
      </Button>
    </View>
  );
}

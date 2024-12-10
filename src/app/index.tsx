import { View } from "react-native";
import React from "react";
import { Welcome } from "@/components/welcome";
import { Steps } from "@/components/steps";

export default function Index() {
  return (
    <View className="flex-1 p-10 gap-10">
      <Welcome />
      <Steps />
    </View>
  );
}

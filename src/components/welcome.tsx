import { View, Image } from "react-native";
import React from "react";
import { NearbyText } from "./text";

export function Welcome() {
  return (
    <View>
      <Image
        source={require("@/assets/logo.png")}
        className="w-12 h-12 mt-6 mb-7"
      />
      <NearbyText className="text-2xl font-bold text-gray-600">
        Boas vindas ao Nearby!
      </NearbyText>
      <NearbyText className="text-base font-regular text-gray-500 mt-3">
        Tenha cupons de vantagem para usar em {"\n"}
        seus estabelecimentos favoritos.
      </NearbyText>
    </View>
  );
}

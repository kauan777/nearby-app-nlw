import { View } from "react-native";
import React from "react";
import { NearbyText } from "../text";
import { IconProps } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

interface Props {
  title: string;
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function Step({ description, title, icon: Icon }: Readonly<Props>) {
  return (
    <View className="w-full flex-row gap-4">
      {Icon && <Icon size={24} color={colors.red.base} />}
      <View className="flex-1">
        <NearbyText className="text-base font-semibold text-gray-600">
          {title}
        </NearbyText>
        <NearbyText className="text-sm font-regular text-gray-500 mt-1">
          {description}
        </NearbyText>
      </View>
    </View>
  );
}

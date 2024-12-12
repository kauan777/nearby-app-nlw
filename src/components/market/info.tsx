import { View } from "react-native";
import { NearbyText } from "../text";
import { IconProps } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";

interface Props {
  description: string;
  icon: React.ComponentType<IconProps>;
}

export function Info({ description, icon: Icon }: Readonly<Props>) {
  return (
    <View className="flex-row items-center gap-2">
      {Icon && <Icon size={16} color={colors.gray[400]} />}
      <NearbyText className="text-gray-500 text-sm font-regular flex-1 leading-[22.4px]">
        {description}
      </NearbyText>
    </View>
  );
}

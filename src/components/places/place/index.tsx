import {
  View,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
} from "react-native";
import React from "react";
import { NearbyText } from "@/components/text";
import { IconTicket } from "@tabler/icons-react-native";
import { colors } from "@/styles/colors";
import { PlaceProps } from "@/@types/Place";

interface Props extends TouchableOpacityProps {
  data: PlaceProps;
}

export function Place({ data: place, ...props }: Readonly<Props>) {
  return (
    <TouchableOpacity
      className="h-[120] gap-4 items-center w-full p-2 border border-gray-200 rounded-xl flex-row"
      {...props}
    >
      <Image
        className="w-[116] h-[104] bg-gray-200 rounded-lg"
        source={{ uri: place.cover }}
      />
      <View className="flex-1 gap-1">
        <NearbyText className="text-sm font-medium text-gray-600">
          {place.name}
        </NearbyText>
        <NearbyText className="text-xs font-regular text-gray-500">
          {place.description}
        </NearbyText>
        <View className="flex-row gap-2 mt-[10]">
          <IconTicket size={16} color={colors.red.base} />
          <NearbyText className="text-xs font-regular text-gray-400">
            {place.coupons} cupons disponíveis
          </NearbyText>
        </View>
      </View>
    </TouchableOpacity>
  );
}

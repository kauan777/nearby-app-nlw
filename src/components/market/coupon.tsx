import { View } from "react-native";
import { IconTicket } from "@tabler/icons-react-native";

import { colors } from "@/styles/theme";
import { NearbyText } from "../text";

type Props = {
  code: string;
};

export function Coupon({ code }: Readonly<Props>) {
  return (
    <View className="px-8">
      <NearbyText className="text-gray-500 font-medium mb-3 text-sm">
        Utilize esse cupom
      </NearbyText>
      <View className="flex-row bg-green-soft px-2 py-[10px] rounded-lg items-center gap-[10px]">
        <IconTicket size={24} color={colors.green.light} />
        <NearbyText className="text-gray-600 text-base font-semibold uppercase">
          {code}
        </NearbyText>
      </View>
    </View>
  );
}

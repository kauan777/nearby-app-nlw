import { View } from "react-native";
import { NearbyText } from "../text";
import { IconPhone, IconMapPin, IconTicket } from "@tabler/icons-react-native";
import { Info } from "./info";

export interface PropsDetails {
  name: string;
  description: string;
  address: string;
  phone: string;
  coupons: number;
  rules: {
    id: string;
    description: string;
  }[];
}

interface Props {
  data: PropsDetails;
}

export function Details({ data }: Readonly<Props>) {
  return (
    <View className="p-8 pb-0 rounded-t-[20px] bg-gray-100">
      <NearbyText className="text-xl font-bold text-gray-600">
        {data.name}
      </NearbyText>
      <NearbyText className="text-base mt-3 mb-8 leading-[22px] font-regular text-gray-500">
        {data.description}
      </NearbyText>
      <View className="w-full border-b border-gray-200 pb-4 mb-4">
        <NearbyText className="text-sm mb-3 font-medium text-gray-500">
          Informações
        </NearbyText>
        <Info
          icon={IconTicket}
          description={`${data.coupons} cupons disponíveis`}
        />
        <Info icon={IconMapPin} description={data.address} />
        <Info icon={IconPhone} description={data.phone} />
      </View>
      <View className="w-full border-b border-gray-200 pb-4 mb-4">
        <NearbyText className="text-sm mb-3 font-medium text-gray-500">
          Regulamento
        </NearbyText>
        {data.rules.map((rule) => (
          <NearbyText
            key={rule.id}
            className="text-sm font-regular text-gray-500 mt-2"
          >
            {`\u2022 ` + rule.description}
          </NearbyText>
        ))}
      </View>
    </View>
  );
}

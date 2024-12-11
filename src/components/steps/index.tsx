import { View } from "react-native";
import { NearbyText } from "../text";
import { Step } from "./step";
import { IconMapPin, IconQrcode, IconTicket } from "@tabler/icons-react-native";

export function Steps() {
  return (
    <View className="gap-6 flex-1">
      <NearbyText className="text-base font-regular text-gray-500">
        Veja como funciona:
      </NearbyText>
      <Step
        icon={IconMapPin}
        title="Encontre estabelecimentos"
        description="Veja locais perto de você que são parceiros Nearby"
      />
      <Step
        icon={IconQrcode}
        title="Ative o cupom com QR Code"
        description="Escaneie o código no estabelecimento para usar o benefício"
      />
      <Step
        icon={IconTicket}
        title="Garanta vantagens perto de você"
        description="Ative cupons onde estiver, em diferentes tipos de estabelecimento "
      />
    </View>
  );
}

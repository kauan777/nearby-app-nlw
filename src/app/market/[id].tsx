import { useEffect, useRef, useState } from "react";

import { View, Alert, Modal, StatusBar, ScrollView } from "react-native";
import { Redirect, router, useLocalSearchParams } from "expo-router";
import { api } from "@/services/axios";
import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { PropsDetails, Details } from "@/components/market/details";
import { Coupon } from "@/components/market/coupon";
import { Button } from "@/components/button";
import { IconQrcode } from "@tabler/icons-react-native";
import { useCameraPermissions, CameraView } from "expo-camera";

interface MarketProps extends PropsDetails {
  cover: string;
}

export default function DetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [market, setMarket] = useState<MarketProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingGetCoupon, setIsLoadingGetCoupon] = useState(false);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [isVisbleCameraModal, setIsVisbleCameraModal] = useState(false);
  const [_, requestPermission] = useCameraPermissions();
  const qrLock = useRef(false);

  async function getMarketById() {
    try {
      const { data: market } = await api.get("/markets/" + id);
      setMarket(market);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Local", "Não foi possivel carregar o local.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    }
  }

  async function handleOpenCamera() {
    try {
      const { granted } = await requestPermission();

      if (!granted) {
        return Alert.alert("Permissão", "Permissão de camera negada.");
      }
      qrLock.current = false;
      setIsVisbleCameraModal(true);
    } catch (error) {
      Alert.alert("Câmera", "Não foi possivel utilizar a câmera.");
      console.error(error);
    }
  }

  async function getCoupon(id: string) {
    try {
      setIsLoadingGetCoupon(true);
      const { data } = await api.patch("/coupons/" + id);

      Alert.alert("Coupon", data.coupon);
      setCoupon(data.coupon);
    } catch (error) {
      console.error(error);
      Alert.alert("Cupom", "Não foi possivel carregar o cupom.");
    } finally {
      setIsLoadingGetCoupon(false);
    }
  }

  function handleUseCoupon(id: string) {
    setIsVisbleCameraModal(false);

    Alert.alert(
      "Cupom",
      "Não é possivel utilizar um cupom resgatado. Dseja realmente resgatar o cupom?",
      [
        { style: "cancel", text: "Não" },
        {
          text: "Sim",
          onPress: () => {
            getCoupon(id);
          },
        },
      ]
    );
  }

  useEffect(() => {
    getMarketById();
  }, [id, coupon]);

  if (isLoading) {
    return <Loading />;
  }

  if (!market) {
    return <Redirect href="/home" />;
  }

  return (
    <View className="flex-1">
      <StatusBar barStyle="light-content" hidden={isVisbleCameraModal} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Cover uri={market.cover} />
        <Details data={market} />
        {coupon && <Coupon code={coupon} />}
        <View className="p-8">
          <Button onPress={handleOpenCamera}>
            <Button.Icon icon={IconQrcode} />
            <Button.Title>Ler QR Code</Button.Title>
          </Button>
        </View>
      </ScrollView>
      <Modal className="flex-1" visible={isVisbleCameraModal}>
        <CameraView
          style={{ flex: 1 }}
          onBarcodeScanned={({ data }) => {
            if (data && !qrLock.current) {
              qrLock.current = true;
              setTimeout(() => {
                handleUseCoupon(data);
              }, 500);
            }
          }}
        />
        <View className="absolute bottom-8 left-8 right-8">
          <Button
            onPress={() => setIsVisbleCameraModal(false)}
            isLoading={isLoadingGetCoupon}
          >
            <Button.Title>Voltar</Button.Title>
          </Button>
        </View>
      </Modal>
    </View>
  );
}

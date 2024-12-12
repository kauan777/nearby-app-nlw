import { Alert, View } from "react-native";
import { useEffect, useState } from "react";
import MapView, { Callout, Marker } from "react-native-maps";
import { api } from "@/services/axios";
import { CategoryProps } from "@/@types/Category";
import { Categories } from "@/components/categories";
import { PlaceProps } from "@/@types/Place";
import { Places } from "@/components/places";
import * as Location from "expo-location";
import { NearbyText } from "@/components/text";
import { router } from "expo-router";

interface MarketsProps extends PlaceProps {
  latitude: number;
  longitude: number;
}

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<CategoryProps[]>([]);
  const [markets, setMarkets] = useState<MarketsProps[]>([]);
  const [categorySelected, setCategorySelected] = useState("");

  async function getCategories() {
    try {
      const { data: categories } = await api.get("/categories");
      setCategories(categories);
      setCategorySelected(categories[0].id);
    } catch (error) {
      console.error(error);
      Alert.alert("Categorias", "Não foi possivel carregar as categorias.");
    }
  }

  async function getMarkets() {
    try {
      if (!categorySelected) return;
      const { data: markets } = await api.get(
        "/markets/category/" + categorySelected
      );
      setMarkets(markets);
    } catch (error) {
      console.error(error);
      Alert.alert("Locais", "Não foi possivel carregar as locais.");
    }
  }

  async function getCurrentLocation() {
    try {
      const { granted } = await Location.requestForegroundPermissionsAsync();

      if (granted) {
        const location = await Location.getCurrentPositionAsync();
        console.log(location);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Localização", "Não foi possivel carregar a localização.");
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    getMarkets();
  }, [categorySelected]);

  return (
    <View className="flex-1 bg-slate-400">
      <Categories
        data={categories}
        selected={categorySelected}
        onSelect={setCategorySelected}
      />
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />
        {markets.map((market) => (
          <Marker
            key={market.id}
            identifier={market.id}
            coordinate={{
              latitude: market.latitude,
              longitude: market.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${market.id}`)}>
              <View>
                <NearbyText className="text-sm text-gray-600 font-medium">
                  {market.name}
                </NearbyText>
                <NearbyText className="text-xs text-gray-600 font-regular">
                  {market.address}
                </NearbyText>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  );
}

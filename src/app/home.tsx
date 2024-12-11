import { Alert, View } from "react-native";
import { useEffect, useState } from "react";
import { api } from "@/services/axios";
import { CategoryProps } from "@/@types/Category";
import { Categories } from "@/components/categories";
import { PlaceProps } from "@/@types/Place";
import { Places } from "@/components/places";

interface MarketsProps extends PlaceProps {}

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
      <Places data={markets} />
    </View>
  );
}

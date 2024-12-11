import { FlatList } from "react-native";
import { Category } from "./category";
import { CategoryProps } from "@/@types/Category";

interface Props {
  data: CategoryProps[];
  selected: string;
  onSelect: (id: string) => void;
}

export function Categories({ data, selected, onSelect }: Props) {
  return (
    <FlatList
      data={data}
      horizontal
      className={"h-9 absolute z-10 top-16 "}
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="gap-2 px-6"
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          isSelected={item.id === selected}
          onPress={() => onSelect(item.id)}
        />
      )}
    />
  );
}

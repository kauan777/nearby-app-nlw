import { useWindowDimensions } from "react-native";
import React from "react";
import { PlaceProps } from "@/@types/Place";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { Place } from "./place";
import { colors } from "@/styles/colors";
import { NearbyText } from "../text";

interface Props {
  data: PlaceProps[];
}

export function Places({ data }: Readonly<Props>) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  const snapPoints = {
    min: 278,
    max: dimensions.height - 128,
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      backgroundStyle={{ backgroundColor: colors.gray[100] }}
      handleIndicatorStyle={{
        width: 80,
        height: 4,
        backgroundColor: colors.gray[300],
      }}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        contentContainerClassName={"gap-3 p-6 pb-[100]"}
        data={data}
        renderItem={({ item }) => <Place data={item} />}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={ListHeaderComponent}
      />
    </BottomSheet>
  );
}

const ListHeaderComponent = () => {
  return (
    <NearbyText className="text-base font-regular mb-4 text-gray-600">
      Explore locais perto de você
    </NearbyText>
  );
};

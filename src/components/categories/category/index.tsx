import { NearbyText } from "@/components/text";
import { colors } from "@/styles/colors";
import { categoriesIcons } from "@/utils/categories-icons";
import { Pressable, PressableProps } from "react-native";

interface Props extends PressableProps {
  iconId: string;
  isSelected?: boolean;
  name: string;
}

export function Category({
  iconId,
  isSelected = false,
  name,
  ...props
}: Readonly<Props>) {
  const Icon = categoriesIcons[iconId];

  return (
    <Pressable
      className={`h-9 ${
        isSelected ? "bg-green-base" : "bg-gray-100 border border-gray-300"
      }  rounded-lg justify-center items-center flex-row gap-[10px] px-3`}
      {...props}
    >
      <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
      <NearbyText
        className={`text-sm ${
          isSelected ? "text-gray-100" : "text-gray-500"
        } font-regular`}
      >
        {name}
      </NearbyText>
    </Pressable>
  );
}

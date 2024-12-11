import { Text, TextProps } from "react-native";

interface NearbyTextProps extends TextProps {}

export function NearbyText({ children, ...props }: NearbyTextProps) {
  return (
    <Text {...props} maxFontSizeMultiplier={1}>
      {children}
    </Text>
  );
}

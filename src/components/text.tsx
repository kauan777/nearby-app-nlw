import { Text, TextProps } from "react-native";
import React from "react";

interface NearbyTextProps extends TextProps {}

export function NearbyText({ children, ...props }: NearbyTextProps) {
  return (
    <Text {...props} maxFontSizeMultiplier={1}>
      {children}
    </Text>
  );
}

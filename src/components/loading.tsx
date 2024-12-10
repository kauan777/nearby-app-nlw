import { ActivityIndicator } from "react-native";
import React from "react";
import { colors } from "@/styles/colors";

export function Loading() {
  return (
    <ActivityIndicator
      className="flex-1 items-center justify-center bg-gray-100"
      color={colors.green.base}
      size="large"
    />
  );
}

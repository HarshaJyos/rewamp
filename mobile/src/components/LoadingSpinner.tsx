import React from "react";
import { ActivityIndicator, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function LoadingSpinner() {
  const theme = useTheme();
  return (
    <View style={{ padding: 20 }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>
  );
}
import React from "react";
import { StyleSheet, TouchableOpacity, ViewStyle, View } from "react-native";

export default function CardContainer({
  onPress,
  children,
  style,
  disabled = false,
}: {
  onPress?: () => void;
  children: React.ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}) {
  if (disabled) {
    return <View style={[styles.card, style]}>{children}</View>;
  }

  return (
    <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
});

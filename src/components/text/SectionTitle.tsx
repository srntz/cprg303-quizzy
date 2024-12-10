import React from "react";
import { StyleSheet, Text } from "react-native";

export default function SectionTitle({
  sectionTitle,
  style,
}: {
  sectionTitle: string;
  style?: any;
}) {
  return <Text style={[styles.text, style]}>{sectionTitle}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "600",
    // marginHorizontal: 10,
    // marginTop: 20,
    // marginBottom: 10,
  },
});

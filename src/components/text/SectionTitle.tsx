import React from "react";
import { StyleSheet, Text } from "react-native";

export default function SectionTitle({ sectionTitle }: { sectionTitle: string }) {
  return <Text style={styles.text}>{sectionTitle}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: "bold",
    marginHorizontal: 10,
    marginTop: 20,
    marginBottom: 10,
  },
});

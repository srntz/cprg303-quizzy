import React from "react";
import { StyleSheet, Text } from "react-native";

export default function CardTitle({ cardTitle }: { cardTitle: string }) {
  return <Text style={styles.title}>{cardTitle}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 5,
  },
});

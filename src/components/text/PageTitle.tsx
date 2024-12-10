import React from "react";
import { StyleSheet, Text } from "react-native";

export default function PageTitle({ pageTitle }: { pageTitle: string }) {
  return <Text style={styles.title}>{pageTitle}</Text>;
}

const styles = StyleSheet.create({
  title: {
    color: "white",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "600",
    marginVertical: 10,
  },
});

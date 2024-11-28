import React from "react";
import { StyleSheet, Text } from "react-native";

export default function PageTitle({ pageTitle }: { pageTitle: string }) {
  return <Text>{pageTitle}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
});

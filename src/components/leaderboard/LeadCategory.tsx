import React from "react";
import { StyleSheet, Text, View } from "react-native";
import CardContainer from "../card/CardContainer";

export default function LeadCategory({ leadCategory }: { leadCategory: string }) {
  return (
    <CardContainer style={styles.contaier}>
      <Text style={styles.text}>{leadCategory}</Text>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  contaier: {
    backgroundColor: "#E6D4F4",
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
  },
});

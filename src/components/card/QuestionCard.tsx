import React from "react";
import CardContainer from "./CardContainer";
import { StyleSheet, Text } from "react-native";

export default function QuestionCard({ question }: { question: string }) {
  return (
    <CardContainer style={styles.container} disabled={true}>
      <Text style={styles.question}>{question}</Text>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingVertical: 30,
    flexShrink: 1,
  },
  question: {
    fontSize: 20,
    fontWeight: "500",
    textAlign: "center",
  },
});

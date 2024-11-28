import React from "react";
import CardContainer from "./CardContainer";
import { StyleSheet, Text } from "react-native";

export default function AnswerContainer({
  answer,
  answerOption,
}: {
  answer: string;
  answerOption: string;
}) {
  return (
    <CardContainer style={styles.container}>
      <Text style={styles.answerOption}>{answerOption}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    paddingVertical: 10,
  },
  answerOption: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  answer: {
    fontSize: 16,
    fontWeight: "500",
    marginLeft: 10,
  },
});

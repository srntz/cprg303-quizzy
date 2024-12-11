import React from "react";
import CardContainer from "./CardContainer";
import { Pressable, StyleSheet, Text, ViewStyle } from "react-native";
import { Colors } from "@/constants/Colors";

export default function AnswerCard({
  answer,
  answerOption,
  onPress,
  correct,
}: {
  answer: string;
  answerOption: string;
  onPress?: () => void;
  correct?: boolean;
}) {
  return (
    <CardContainer
      style={
        StyleSheet.compose(styles.container, {
          backgroundColor:
            correct == undefined
              ? "white"
              : correct
                ? Colors.light.answerCorrect
                : Colors.light.answerWrong,
        }) as ViewStyle
      }
      onPress={onPress}
    >
      <Text style={styles.answerOption}>{answerOption}</Text>
      <Text style={styles.answer}>{answer}</Text>
    </CardContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    minHeight: 60,
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

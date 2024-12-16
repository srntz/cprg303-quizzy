import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, ViewStyle } from "react-native";
import CardContainer from "./CardContainer";

export default function AnswerCard({
  answer,
  answerOption,
  onPress,
  correct,
  selected,
  isAnswerTimeout,
}: {
  answer: string;
  answerOption: string;
  onPress?: () => void;
  correct?: boolean; // Indicates if the answer is correct
  selected?: boolean; // Indicates if this answer was selected by the user
  isAnswerTimeout?: boolean; // Indicates if the timeout has occurred after an answer
}) {
  const getBackgroundColor = () => {
    if (!isAnswerTimeout) {
      return "white"; // Default background before timeout
    }
    if (selected && correct) {
      return Colors.light.answerCorrect; // Highlight correct answer if selected
    }
    if (selected && !correct) {
      return Colors.light.answerWrong; // Highlight wrong answer if selected
    }
    if (correct) {
      return Colors.light.answerCorrect; // Highlight the correct answer
    }
    return "white"; // Default background for other answers
  };

  return (
    <CardContainer
      style={StyleSheet.compose(styles.container, {
        backgroundColor: getBackgroundColor(),
      }) as ViewStyle}
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
    borderRadius: 8,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // For Android shadow
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

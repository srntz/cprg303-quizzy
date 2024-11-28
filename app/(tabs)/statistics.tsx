import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import QuestionCard from "@/src/components/card/QuestionCard";
import AnswerCard from "@/src/components/card/AnswerCard";

export default function SearchScreen() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.light.accent,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <QuestionCard question="What is the capital of France?" />
      <AnswerCard answerOption="A" answer="Paris" />
    </View>
  );
}

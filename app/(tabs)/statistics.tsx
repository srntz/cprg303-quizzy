import { Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import QuestionContainer from "@/src/components/card/QuestionContainer";
import AnswerContainer from "@/src/components/card/AnswerContainer";

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
      {/* <Text style={{ fontFamily: "Rubik_600SemiBold", color: "white" }}>Statistics Page</Text> */}
      <QuestionContainer question="What is the capital of France?" />
      <AnswerContainer answerOption="A" answer="Paris" />
    </View>
  );
}

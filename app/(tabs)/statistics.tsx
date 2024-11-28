import { View } from "react-native";
import { Colors } from "@/constants/Colors";
import QuestionCard from "@/src/components/card/QuestionCard";
import AnswerCard from "@/src/components/card/AnswerCard";
import LeadCategory from "@/src/components/leaderboard/LeadCategory";
import TopUsers from "@/src/components/leaderboard/TopUsers";

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

      <LeadCategory leadCategory="Math" />
      <TopUsers />
      <LeadCategory leadCategory="Science" />
    </View>
  );
}

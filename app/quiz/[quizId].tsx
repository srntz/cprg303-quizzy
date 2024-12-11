import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { router } from "expo-router";
import { QuizApi } from "@/api/generated";
import QuestionCard from "@/src/components/card/QuestionCard";
import AnswerCard from "@/src/components/card/AnswerCard";

export default function Quiz() {
  const { quizId } = useLocalSearchParams();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();

  const [timer, setTimer] = useState<number>(30);
  const [quizData, setQuizData] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);

  if (timer === 0) {
    clearInterval(interval.current as ReturnType<typeof setInterval>);
  }

  useEffect(() => {
    interval.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    // async function getQuizData() {
    //   const api = new QuizApi();
    //   try {
    //     const data = await api.questionsGet("category1");
    //     return data;
    //   } catch (e) {
    //     return "Error";
    //   }
    // }
    //
    // getQuizData().then((data) => console.log(data));
  }, []);

  return (
    <StatusBarMarginLayout backgroundColor={Colors.light.accent} theme={"light"}>
      <View style={{ backgroundColor: Colors.light.accent, flex: 1, alignItems: "center" }}>
        <View style={{ flex: 1, width: "100%", paddingHorizontal: 12 }}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              height: "20%",
              alignItems: "center",
              paddingVertical: 5,
            }}
          >
            <Pressable
              onPress={() => {
                router.back();
              }}
            >
              <Text style={{ color: "white" }}>Back</Text>
            </Pressable>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              gap: 4,
            }}
          >
            <Text style={{ textAlign: "center", fontSize: 15, color: "white" }}>
              Remaining Time
            </Text>
            <Text style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", color: "white" }}>
              {timer}
            </Text>
          </View>
        </View>
        <View
          style={{
            backgroundColor: Colors.light.background,
            height: "80%",
            width: "96%",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingVertical: 30,
            gap: 10,
            alignItems: "center",
          }}
        >
          <View style={{ width: "85%" }}>
            <QuestionCard question={"What?"} />
          </View>
          <View style={{ flex: 1, width: "85%" }}>
            <AnswerCard answer={"Nothing"} answerOption={"A"} />
            <AnswerCard answer={"Something"} answerOption={"B"} />
            <AnswerCard answer={"Anything"} answerOption={"C"} />
            <AnswerCard answer={"What what?"} answerOption={"D"} />
          </View>
        </View>
      </View>
    </StatusBarMarginLayout>
  );
}

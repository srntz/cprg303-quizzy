import React, { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { router } from "expo-router";
import { QuizApi, SaveQuizResultRequestScoreBreakdownInner } from "@/api/generated";
import QuestionCard from "@/src/components/card/QuestionCard";
import AnswerCard from "@/src/components/card/AnswerCard";
import { IQuiz } from "@/src/interfaces/IQuiz";

export default function Quiz() {
  const { quizId } = useLocalSearchParams();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();

  const [timer, setTimer] = useState<number>(30);
  const [quizData, setQuizData] = useState<IQuiz>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [results, setResults] = useState<{
    total_score: number;
    score_breakdown: SaveQuizResultRequestScoreBreakdownInner[];
  }>({
    total_score: 0,
    score_breakdown: [],
  });

  const [isAnswerTimeout, setIsAnswerTimeout] = useState<boolean>(false);

  useEffect(() => {
    async function getQuizData() {
      const api = new QuizApi();
      try {
        const res = await api.quizWithQuestionsGet(quizId as string);
        return res;
      } catch (e) {
        return "Error";
      }
    }

    getQuizData().then((res) => {
      setQuizData(res.data);
    });
  }, []);

  useEffect(() => {
    if (currentQuestion < (quizData?.questions.length as number) || currentQuestion === 0) {
      if (interval.current) {
        clearInterval(interval.current as ReturnType<typeof setInterval>);
      }

      interval.current = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval.current);
    }
  }, [currentQuestion]);

  useEffect(() => {
    if (isAnswerTimeout) {
      clearInterval(interval.current);
    }
  }, [isAnswerTimeout]);

  function handleNextQuestion() {
    if (currentQuestion < (quizData?.questions.length as number)) {
      setTimer(30);
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswerTimeout(false);
    }
  }

  function handleAnswer(question_id: string, is_correct: boolean) {
    setIsAnswerTimeout(true);
    setTimeout(handleNextQuestion, 2000);
    setResults((prev) => {
      let total_score = prev.total_score;
      const score_breakdown = prev.score_breakdown;

      if (is_correct) {
        total_score++;
      }

      score_breakdown.push({ question_id, score: is_correct ? 1 : 0 });

      return {
        total_score,
        score_breakdown,
      };
    });
  }

  if (timer === 0) {
    handleNextQuestion();
  }

  return (
    <StatusBarMarginLayout backgroundColor={Colors.light.accent} theme={"light"}>
      <View style={{ backgroundColor: Colors.light.accent, flex: 1, alignItems: "center" }}>
        {currentQuestion < (quizData?.questions.length as number) || currentQuestion === 0 ? (
          <>
            <View style={{ flex: 1, width: "100%", paddingHorizontal: 12 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "20%",
                  alignItems: "center",
                  paddingVertical: 5,
                  marginTop: 10,
                }}
              >
                <Pressable
                  onPress={() => {
                    router.back();
                  }}
                  style={{
                    backgroundColor: "white",
                    height: 30,
                    width: 70,
                    justifyContent: "center",
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "black", textAlign: "center", fontWeight: "semibold" }}>
                    Back
                  </Text>
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
                <Text
                  style={{ textAlign: "center", fontSize: 35, fontWeight: "bold", color: "white" }}
                >
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
              {quizData && (
                <>
                  <View style={{ width: "85%" }}>
                    <QuestionCard question={quizData.questions[currentQuestion].question_text} />
                  </View>
                  <View style={{ flex: 1, width: "85%" }}>
                    {!isAnswerTimeout
                      ? quizData.questions[currentQuestion].answers.map((item, index) => (
                          <AnswerCard
                            key={index}
                            answer={item.option}
                            answerOption={`${index + 1})`}
                            onPress={() =>
                              handleAnswer(quizData?.questions[currentQuestion].id, item.is_correct)
                            }
                          />
                        ))
                      : quizData.questions[currentQuestion].answers.map((item, index) => (
                          <AnswerCard
                            key={index}
                            answer={item.option}
                            answerOption={`${index + 1})`}
                            correct={item.is_correct}
                          />
                        ))}
                  </View>
                  <Pressable
                    style={{
                      backgroundColor: Colors.light.accent,
                      width: "85%",
                      height: 50,
                      justifyContent: "center",
                      borderRadius: 10,
                    }}
                  >
                    <Text
                      style={{ textAlign: "center", color: "white", fontWeight: "bold" }}
                      onPress={handleNextQuestion}
                    >
                      Skip
                    </Text>
                  </Pressable>
                </>
              )}
            </View>
          </>
        ) : (
          <>
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 70 }}>
              <View style={{ alignItems: "center", justifyContent: "center", gap: 15 }}>
                <Text
                  style={{
                    color: "white",
                    width: 300,
                    fontSize: 30,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}
                >
                  You have completed the quiz!
                </Text>
                <Text style={{ color: "white", fontSize: 20, fontWeight: "semibold" }}>
                  Score: {results.total_score}
                </Text>
              </View>
              <Pressable
                style={{
                  backgroundColor: "white",
                  width: 200,
                  height: 50,
                  borderRadius: 10,
                  justifyContent: "center",
                }}
                onPress={() => router.replace("../screens")}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 18,
                  }}
                >
                  Continue
                </Text>
              </Pressable>
            </View>
          </>
        )}
      </View>
    </StatusBarMarginLayout>
  );
}

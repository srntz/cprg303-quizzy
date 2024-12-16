import { Quiz, QuizApi, QuizResultsApi, SaveQuizResultRequestScoreBreakdownInner } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import AnswerCard from "@/src/components/card/AnswerCard";
import QuestionCard from "@/src/components/card/QuestionCard";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { getItem } from "@/src/utils/secure_storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";

function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export default function QuizPage() {
  const { quizId } = useLocalSearchParams();
  const interval = useRef<ReturnType<typeof setInterval> | undefined>();

  const [timer, setTimer] = useState<number>(30);
  const [quizData, setQuizData] = useState<Quiz>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0);
  const [results, setResults] = useState<{
    total_score: number;
    score_breakdown: SaveQuizResultRequestScoreBreakdownInner[];
  }>({
    total_score: 0,
    score_breakdown: [],
  });

  const [isAnswerTimeout, setIsAnswerTimeout] = useState<boolean>(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  useEffect(() => {
    async function getQuizData() {
      const api = new QuizApi();
      try {
        const res = await api.quizWithQuestionsGet(quizId as string);
        const quiz = res.data;
        if (quiz?.questions) {
          // Shuffle the answers for each question
          quiz.questions = quiz.questions.map((question) => ({
            ...question,
            answers: shuffleArray(question.answers ?? []),
          }));
        }
        setQuizData(quiz ?? []);
      } catch (e) {
        console.error("Error fetching quiz data:", e);
      }
    }

    getQuizData();
  }, []);

  useEffect(() => {
    if (currentQuestion < (quizData?.questions?.length as number) || currentQuestion === 0) {
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
    if (currentQuestion < (quizData?.questions?.length as number)) {
      setTimer(30);
      setSelectedAnswer(null); 
      setCurrentQuestion((prev) => prev + 1);
      setIsAnswerTimeout(false);
    }
  }

  function handleAnswer(question_id: string, is_correct: boolean, selectedAnswer: string) {
    setSelectedAnswer(selectedAnswer); 
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

  async function saveResults() {
    const currentUserId = (await getItem("userId")) ?? "";
    if (currentUserId === "" || results.total_score == null || results.score_breakdown.length === 0)
      return;

    const api = new QuizResultsApi();
    try {
      await api.saveQuizResultPost({
        userId: currentUserId,
        totalScore: results.total_score,
        scoreBreakdown: results.score_breakdown,
        categoryId: quizData?.category_id ?? "",
        quizId: quizData?.id,
      });
      console.log("Results saved successfully");
    } catch (e) {
      console.error("Error saving results:", e);
    }
  }

  useEffect(() => {
    if (currentQuestion >= (quizData?.questions?.length ?? 0)) {
      saveResults();
    }
  }, [currentQuestion]);

  if (timer === 0) {
    handleNextQuestion();
  }

  return (
    <StatusBarMarginLayout backgroundColor={Colors.light.accent} theme={"light"}>
      <View style={{ backgroundColor: Colors.light.accent, flex: 1, alignItems: "center" }}>
        {currentQuestion < (quizData?.questions?.length as number) || currentQuestion === 0 ? (
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
                <Text style={{ flex: 1, textAlign: "center", color: "white", fontWeight: "bold" }}>
                  {quizData?.name}
                </Text>
                <View style={{ width: 70 }}></View>
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
                    <QuestionCard
                      question={quizData?.questions![currentQuestion]!.question_text ?? ""}
                    />
                  </View>
                  <View style={{ flex: 1, width: "85%" }}>
                    {quizData!.questions![currentQuestion]!.answers!.map((item, index) => (
                      <AnswerCard
                        key={index}
                        answer={item.option ?? ""}
                        answerOption={`${index + 1})`}
                        onPress={() =>
                          !isAnswerTimeout &&
                          handleAnswer(
                            quizData!.questions![currentQuestion]!.id!,
                            item.is_correct ?? false,
                            item.option ?? ""
                          )
                        }
                        selected={item.option === selectedAnswer}
                        correct={item.is_correct}
                        isAnswerTimeout={isAnswerTimeout}
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

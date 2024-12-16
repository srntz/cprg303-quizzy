import { Quiz, SaveQuizResultRequestScoreBreakdownInner } from "@/api/generated";
import { Colors } from "@/constants/Colors";
import AnswerCard from "@/src/components/card/AnswerCard";
import QuestionCard from "@/src/components/card/QuestionCard";
import StatusBarMarginLayout from "@/src/components/utils/StatusBarMarginLayout";
import { getItem } from "@/src/utils/secure_storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Pressable, Text, View } from "react-native";
import QuizEndScreen from "@/src/components/quiz/QuizEndScreen";
import { getQuizData } from "@/src/services/getQuizData";
import { saveQuizResults } from "@/src/services/saveQuizResults";
import QuizHeader from "@/src/components/quiz/QuizHeader";
import QuizTimer from "@/src/components/quiz/QuizTimer";

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
    async function fetchQuizData() {
      const quiz = await getQuizData(quizId as string);
      setQuizData(quiz);
    }

    fetchQuizData();
  }, []);

  useEffect(() => {
    if (currentQuestion >= (quizData?.questions?.length ?? 0)) {
      saveResults();
    }

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

    await saveQuizResults({
      userId: currentUserId,
      totalScore: results.total_score,
      scoreBreakdown: results.score_breakdown,
      categoryId: quizData?.category_id ?? "",
      quizId: quizData?.id,
    });
  }

  if (timer === 0) {
    handleNextQuestion();
  }

  return (
    <StatusBarMarginLayout backgroundColor={Colors.light.accent} theme={"light"}>
      <View style={{ backgroundColor: Colors.light.accent, flex: 1, alignItems: "center" }}>
        {currentQuestion < (quizData?.questions?.length as number) || currentQuestion === 0 ? (
          <>
            <View style={{ flex: 1, width: "100%", paddingHorizontal: 12 }}>
              <QuizHeader quizName={quizData?.name || ""} onNavigateBack={() => router.back()} />
              {quizData && <QuizTimer timer={timer} />}
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
                            item.option ?? "",
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
          <QuizEndScreen
            score={results.total_score}
            onContinue={() => router.replace("../screens")}
          />
        )}
      </View>
    </StatusBarMarginLayout>
  );
}

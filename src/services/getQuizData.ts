import { Quiz, QuizApi } from "@/api/generated";
import { shuffleArray } from "@/src/utils/shuffleArray";

export async function getQuizData(quizId: string): Promise<Quiz | undefined> {
  const api = new QuizApi();
  try {
    const res = await api.quizWithQuestionsGet(quizId as string);
    const quiz: Quiz = res.data;
    if (quiz?.questions) {
      // Shuffle the answers for each question
      quiz.questions = quiz.questions.map((question) => ({
        ...question,
        answers: shuffleArray(question.answers ?? []),
      }));
    }
    return quiz;
  } catch (e) {
    console.error("Error fetching quiz data:", e);
  }
}

import { QuizResultsApi, SaveQuizResultRequest } from "@/api/generated";

export async function saveQuizResults(data: SaveQuizResultRequest) {
  const api = new QuizResultsApi();
  try {
    await api.saveQuizResultPost(data);
    console.log("Results saved successfully");
  } catch (e) {
    console.error("Error saving results:", e);
  }
}

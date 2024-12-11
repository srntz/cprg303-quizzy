export interface IQuiz {
  questions: {
    question_text: string;
    answers: {
      is_correct: boolean;
      option: string;
    }[];
    category_id: string;
    id: string;
  }[];
}

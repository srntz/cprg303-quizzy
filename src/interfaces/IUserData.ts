interface IScoreBreakdown {
  question_id: string;
  score: number;
}

interface IQuizzesPlayed {
  quiz_id: string;
  category_id: string;
  completion_date: string;
  total_score: number;
  score_breakdown: IScoreBreakdown[];
}

export interface IUserData {
  id: number;
  username: string;
  email: string;
  country: string;
  quizzes_played: IQuizzesPlayed[];
}

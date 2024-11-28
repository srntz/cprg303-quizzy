interface IScoreBreakdown {
  question_id: string;
  score: number;
}

export interface IQuizzesPlayed {
  quiz_id: string;
  category_id: string;
  completion_date: string;
  total_score: number;
  score_breakdown: IScoreBreakdown[];
}

export interface IUserData {
  id: string;
  username: string;
  email: string;
  country: string;
  quizzes_played: IQuizzesPlayed[];
}

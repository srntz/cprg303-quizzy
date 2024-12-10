export interface IPopularQuiz {
  category_id: string;
  id: string;
  name: string;
  play_count: number;
  questions: {
    id: string;
  }[];
}

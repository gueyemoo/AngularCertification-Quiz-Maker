export const difficultyOptions: string[] = ['easy', 'medium', 'hard'];


export const AMOUNT_OF_QUESTIONS: number = 5;

export const QUESTION_TYPE: string = 'multiple';

export const shuffleArray = (array: any[]): any[] => {
  return array.sort(() => Math.random() - 0.5);
};
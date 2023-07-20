export const difficultyOptions: string[] = ['easy', 'medium', 'hard'];


export const AMOUNT_OF_QUESTIONS: number = 5;

export const QUESTION_TYPE: string = 'multiple';

export const shuffleArray = (array: string[]): string[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const decodeHtmlEntities = (input: string): string => {
  const tempElement = document.createElement('div');
  tempElement.innerHTML = input;
  return tempElement.textContent || tempElement.innerText || '';
};
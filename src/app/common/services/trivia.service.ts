import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoriesResponse } from '../models/trivia-input.model';
import { QuizQuestion } from '../models/trivia-quiz.model';
import {
  AMOUNT_OF_QUESTIONS,
  QUESTION_TYPE,
  decodeHtmlEntities,
} from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com';
  private quizQuestions: QuizQuestion[] = [];
  private userAnswers: string[] = [];

  constructor(private http: HttpClient) {}

  public getCategories(): Observable<CategoriesResponse> {
    const categoriesUrl = `${this.apiUrl}/api_category.php`;
    return this.http.get<CategoriesResponse>(categoriesUrl);
  }

  public getQuizQuestions(
    category: number,
    difficulty: string
  ): Observable<QuizQuestion[]> {
    const amount = AMOUNT_OF_QUESTIONS;
    const type = QUESTION_TYPE;

    const req_url = `${this.apiUrl}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    return this.http
      .get<{ results: QuizQuestion[] }>(req_url)
      .pipe(map((res) => this.sanitiseAndBuildOptions(res.results)));
  }

  /**
   * @description format questions to take into account special characters
   * @param questions questions data received from API
   */
  private sanitiseAndBuildOptions(questions: QuizQuestion[]): QuizQuestion[] {
    const sanitisedEncodingQuestions = questions.map((question) => ({
      ...question,
      question: decodeHtmlEntities(question.question),
      correct_answer: decodeHtmlEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map((answer) =>
        decodeHtmlEntities(answer)
      ),
    }));
    return this.buildOptionsProperty(sanitisedEncodingQuestions);
  }

  /**
   * @description build a new property "options" with all the answers of a question
   * @param questions an array of questions data
   */
  private buildOptionsProperty(questions: QuizQuestion[]): QuizQuestion[] {
    return questions.map((question) => ({
      ...question,
      options: [...question.incorrect_answers, question.correct_answer],
    }));
  }

  public setQuizData(questions: QuizQuestion[], answers: string[]): void {
    this.quizQuestions = questions;
    this.userAnswers = answers;
  }
  public getStoredQuizQuestions(): QuizQuestion[] {
    return this.quizQuestions;
  }

  public getQuizUserAnswers(): string[] {
    return this.userAnswers;
  }
}

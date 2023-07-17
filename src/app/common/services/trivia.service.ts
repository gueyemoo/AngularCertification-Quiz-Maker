import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoriesResponse } from '../models/trivia-input.model';
import { QuizQuestion } from '../models/trivia-quiz.model';
import {
  AMOUNT_OF_QUESTIONS,
  QUESTION_TYPE,
  shuffleArray,
} from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com';
  private quizQuestions: QuizQuestion[] = [];
  private userAnswers: string[] = [];

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoriesResponse> {
    const categoriesUrl = `${this.apiUrl}/api_category.php`;
    return this.http.get<CategoriesResponse>(categoriesUrl);
  }

  getQuizQuestions(
    category: number,
    difficulty: string
  ): Observable<QuizQuestion[]> {
    const amount = AMOUNT_OF_QUESTIONS;
    const type = QUESTION_TYPE;

    const req_url = `${this.apiUrl}/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;
    return this.http
      .get<{ results: QuizQuestion[] }>(req_url)
      .pipe(map((res) => this.shuffleOptions(res.results)));
  }

  shuffleOptions(questions: QuizQuestion[]): QuizQuestion[] {
    return questions.map((question) => ({
      ...question,
      options: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));
  }

  setQuizData(questions: QuizQuestion[], answers: string[]): void {
    this.quizQuestions = questions;
    this.userAnswers = answers;
  }
  getStoredQuizQuestions(): QuizQuestion[] {
    return this.quizQuestions;
  }

  getQuizUserAnswers(): string[] {
    return this.userAnswers;
  }
}

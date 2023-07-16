import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { CategoriesResponse } from '../models/trivia-input.model';
import { QuizQuestion } from '../models/trivia-quiz.model';
import { AMOUNT_OF_QUESTIONS, QUESTION_TYPE } from '../helpers/utils';

@Injectable({
  providedIn: 'root',
})
export class TriviaService {
  private apiUrl = 'https://opentdb.com';
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
      .pipe(map((res) => res.results));
  }
}

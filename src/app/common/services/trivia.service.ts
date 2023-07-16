import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoriesResponse } from '../models/trivia-input.model';

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
}

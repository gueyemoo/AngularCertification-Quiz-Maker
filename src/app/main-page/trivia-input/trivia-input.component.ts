import { Component, OnDestroy, ViewChild } from '@angular/core';
import { TriviaService } from '../../common/services/trivia.service';
import { Subject, takeUntil } from 'rxjs';
import { difficultyOptions } from '../../common/helpers/utils';
import { Category } from '../../common/models/trivia-input.model';
import { TriviaQuizComponent } from './trivia-quiz/trivia-quiz.component';

@Component({
  selector: 'app-trivia-input',
  templateUrl: './trivia-input.component.html',
  styleUrls: ['./trivia-input.component.scss'],
})
export class TriviaInputComponent implements OnDestroy {
  @ViewChild(TriviaQuizComponent) triviaQuiz: TriviaQuizComponent;

  public categories: Category[] = [];
  public selectedCategory: number;
  public selectedDifficulty: string;
  public difficultyOptions: string[] = difficultyOptions;
  public isDropdownLoading: boolean = true;

  private _destroyed$: Subject<void> = new Subject<void>();

  constructor(private triviaService: TriviaService) {}

  ngOnInit() {
    this.getCategories();
  }

  /**
   * @description Retrieve the categories from the API
   */
  public getCategories(): void {
    this.triviaService
      .getCategories()
      .pipe(takeUntil(this._destroyed$))
      .subscribe((res) => {
        this.categories = res.trivia_categories;
        this.isDropdownLoading = false;
      });
  }

  public createTrivia(): void {
    this.triviaQuiz?.initQuiz(this.selectedCategory, this.selectedDifficulty);
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

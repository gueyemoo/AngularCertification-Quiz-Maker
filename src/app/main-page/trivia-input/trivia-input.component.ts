import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { TriviaService } from '../../common/services/trivia.service';
import { Subject, takeUntil } from 'rxjs';
import { difficultyOptions } from '../../common/helpers/utils';
import { Category } from '../../common/models/trivia-input.model';

@Component({
  selector: 'app-trivia-input',
  templateUrl: './trivia-input.component.html',
  styleUrls: ['./trivia-input.component.scss'],
})
export class TriviaInputComponent implements OnDestroy {
  @Output() createTrivia: EventEmitter<{
    category: number;
    difficulty: string;
    isTriviaStarted: boolean;
  }> = new EventEmitter();

  public categories: Category[] = [];
  public selectedCategory: number;
  public selectedDifficulty: string;
  public difficultyOptions: string[] = difficultyOptions;
  public isDropdownLoading: boolean = true;

  private _destroyed$: Subject<void> = new Subject<void>();

  constructor(private triviaService: TriviaService) {}

  ngOnInit(): void {
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

  /**
   * @description Send values to parent component on create button click
   */
  public onCreateTrivia(): void {
    this.createTrivia.emit({
      category: this.selectedCategory,
      difficulty: this.selectedDifficulty,
      isTriviaStarted: true,
    });
  }

  /**
   * @description Unsubscribe to prevent any memory leak
   */
  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

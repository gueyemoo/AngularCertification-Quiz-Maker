import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { TriviaService } from 'src/app/common/services/trivia.service';
import { QuizQuestion } from 'src/app/common/models/trivia-quiz.model';

@Component({
  selector: 'app-trivia-quiz',
  templateUrl: './trivia-quiz.component.html',
  styleUrls: ['./trivia-quiz.component.scss'],
})
export class TriviaQuizComponent implements OnChanges, OnDestroy {
  @Input() category: number;
  @Input() difficulty: string;

  public questions: QuizQuestion[];
  public userAnswers: string[] = [];
  public showSubmit: boolean = false;
  public loading: boolean = false;

  private _destroyed$: Subject<void> = new Subject<void>();

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnChanges() {
    if (this.category && this.difficulty) {
      this.initQuiz();
    }
  }

  initQuiz() {
    this.loading = true;
    // Generate a new quiz by resetting the questions and userAnswers and hide submit button
    this.questions = [];
    this.userAnswers = [];
    this.showSubmit = false;
    this.getQuizQuestions(this.category, this.difficulty);
  }

  /**
   * @description retrieve list of questions and shuffle them in a new options property
   * @param category
   * @param difficulty
   */
  private getQuizQuestions(category: number, difficulty: string) {
    this.triviaService
      .getQuizQuestions(category, difficulty)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((questions: QuizQuestion[]) => {
        this.questions = questions;
        //!I SHOULD SHUFFLE HERE THE OPTIONS AND NOT IN THE SERVICE BUT I CAN LEAVE THE BUILD OF THE OPTIONS PROPERTY FOR THE SERVICE.
        this.loading = false;
      });
  }

  selectAnswer(questionIndex: number, optionIndex: number) {
    const selectedOption = this.questions[questionIndex].options[optionIndex];
    this.userAnswers[questionIndex] =
      this.userAnswers[questionIndex] === selectedOption ? '' : selectedOption;
    this.allQuestionsAnswered();
  }

  allQuestionsAnswered(): void {
    this.showSubmit =
      this.userAnswers.filter((answer) => answer !== '').length ===
      this.questions.length;
  }

  submitQuiz() {
    this.triviaService.setQuizData(this.questions, this.userAnswers);
    this.router.navigateByUrl('/results');
  }

  ngOnDestroy() {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

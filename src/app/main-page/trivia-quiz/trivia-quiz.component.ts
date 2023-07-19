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

  ngOnChanges(): void {
    if (this.category && this.difficulty) {
      this.initQuiz(this.category, this.difficulty);
    }
  }

  /**
   * @description initialise the trivia by resetting the data and getting the trivia data based on parameters
   * @param category: the category of the trivia quiz
   * @param difficulty: the difficulty of the trivia
   */
  private initQuiz(category: number, difficulty: string): void {
    this.loading = true;

    this.resetTriviaQuiz();
    this.getQuizQuestions(category, difficulty);
  }

  /**
   * @description reset quiz data
   */
  private resetTriviaQuiz(): void {
    this.questions = [];
    this.userAnswers = [];
    this.showSubmit = false;
  }

  /**
   * @description retrieve list of questions and shuffle them in a new options property
   * @param category
   * @param difficulty
   */
  private getQuizQuestions(category: number, difficulty: string): void {
    this.triviaService
      .getQuizQuestions(category, difficulty)
      .pipe(takeUntil(this._destroyed$))
      .subscribe((questions: QuizQuestion[]) => {
        this.questions = questions;
        //!I SHOULD SHUFFLE HERE THE OPTIONS AND NOT IN THE SERVICE BUT I CAN LEAVE THE BUILD OF THE OPTIONS PROPERTY FOR THE SERVICE.
        this.loading = false;
      });
  }

  /**
   * @description retrieve the selected option by the user
   * @param questionIndex: number of the question answered
   * @param optionIndex: position of the options answered
   */
  public selectAnswer(questionIndex: number, optionIndex: number): void {
    const selectedOption = this.questions[questionIndex].options[optionIndex];
    this.userAnswers[questionIndex] =
      this.userAnswers[questionIndex] === selectedOption ? '' : selectedOption;
    this.allQuestionsAnswered();
  }

  /**
   * @description Check if all the questions are answered by the user
   */
  private allQuestionsAnswered(): void {
    this.showSubmit =
      this.userAnswers.filter((answer) => answer !== '').length ===
      this.questions.length;
  }

  /**
   * @description triggered on click of submit when all questions are answered
   * store answers and questions in trivia service
   * send user to results page
   */
  public submitQuiz(): void {
    this.triviaService.setQuizData(this.questions, this.userAnswers);
    this.router.navigateByUrl('/results');
  }

  /**
   * @description Unsubscribe to prevent any memory leak
   */
  ngOnDestroy(): void {
    this._destroyed$.next();
    this._destroyed$.complete();
  }
}

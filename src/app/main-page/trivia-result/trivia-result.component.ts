import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { QuizQuestion } from 'src/app/common/models/trivia-quiz.model';
import { TriviaService } from 'src/app/common/services/trivia.service';

@Component({
  selector: 'app-trivia-result',
  templateUrl: './trivia-result.component.html',
  styleUrls: ['./trivia-result.component.scss'],
})
export class TriviaResultComponent implements OnInit {
  public storedQuestions: QuizQuestion[] = [];
  public userAnswers: string[] = [];

  constructor(private triviaService: TriviaService, private router: Router) {}

  ngOnInit(): void {
    this.storedQuestions = this.triviaService.getStoredQuizQuestions();
    this.userAnswers = this.triviaService.getQuizUserAnswers();
  }

  /**
   * @description Return a boolean based on if the user answer is the correct answer
   * @param question the questions informations (contain the correct answer)
   * @param answer the user answer
   */
  public checkAnswer(question: QuizQuestion, answer: string): boolean {
    return question.correct_answer === answer;
  }

  /**
   * @description Return the score of the user based on the number of correct answer
   */
  public getScore(): number {
    let score = 0;
    for (let i = 0; i < this.storedQuestions.length; i++) {
      if (this.checkAnswer(this.storedQuestions[i], this.userAnswers[i])) {
        score++;
      }
    }
    return score;
  }

  /**
   * @description Return the background color based on the score of user
   */
  public getScoreColor(): string {
    const score = this.getScore();
    if (score <= 1) {
      return 'red';
    }
    if (score <= 3) {
      return 'yellow';
    }
    return 'green';
  }

  /**
   * @description Return the text color based on the score of user
   */
  public getTextColor(): string {
    const scoreColor = this.getScoreColor();
    if (scoreColor === 'red' || scoreColor === 'green') {
      return 'white';
    }
    return 'black';
  }

  /**
   * @description Redirect to the main component
   */
  public redirectToQuizCreation(): void {
    // Redirect to the home screen
    this.router.navigate(['/']);
  }
}

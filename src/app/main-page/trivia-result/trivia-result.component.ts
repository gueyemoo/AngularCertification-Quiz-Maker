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
    console.log(this.storedQuestions);
    console.log(this.userAnswers);
  }

  isCorrectAnswer(index: number): boolean {
    return (
      this.userAnswers[index] === this.storedQuestions[index].correct_answer
    );
  }

  checkAnswer(question: QuizQuestion, answer: string): boolean {
    return question.correct_answer === answer;
  }

  getScore(): number {
    let score = 0;
    for (let i = 0; i < this.storedQuestions.length; i++) {
      if (this.checkAnswer(this.storedQuestions[i], this.userAnswers[i])) {
        score++;
      }
    }
    return score;
  }

  getScoreColor(): string {
    const score = this.getScore();
    if (score <= 1) {
      return 'red';
    } else if (score <= 3) {
      return 'yellow';
    } else {
      return 'green';
    }
  }

  getTextColor(): string {
    const scoreColor = this.getScoreColor();
    if (scoreColor === 'red') {
      return 'white';
    } else if (scoreColor === 'yellow') {
      return 'black';
    } else if (scoreColor === 'green') {
      return 'white';
    } else {
      return 'black';
    }
  }

  redirectToQuizCreation(): void {
    // Redirect to the home screen
    this.router.navigate(['/']);
  }
}

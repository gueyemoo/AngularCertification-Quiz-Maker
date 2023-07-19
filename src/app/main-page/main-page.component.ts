import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
})
export class MainPageComponent implements OnInit {
  public selectedCategory: number;
  public selectedDifficulty: string;
  public isTriviaStarted: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  /**
   * @description Store data received from input component to send it to the quiz component
   * @param eventData {category, difficulty, isTriviaStarted} received from input component
   */
  onCreateTrivia(eventData: {
    category: number;
    difficulty: string;
    isTriviaStarted: boolean;
  }): void {
    this.selectedCategory = eventData.category;
    this.selectedDifficulty = eventData.difficulty;
    this.isTriviaStarted = eventData.isTriviaStarted;
  }
}

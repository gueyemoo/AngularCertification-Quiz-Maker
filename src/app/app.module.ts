import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './main-page/main-page.component';
import { TriviaInputComponent } from './main-page/trivia-input/trivia-input.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TriviaQuizComponent } from './main-page/trivia-input/trivia-quiz/trivia-quiz.component';
import { SpinnerComponent } from './common/components/UI-spinner/spinner.component';
import { TriviaResultComponent } from './main-page/trivia-result/trivia-result.component';
import { NoDataFoundComponent } from './common/components/No-data-found-display/no-data-found.component';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    TriviaInputComponent,
    TriviaQuizComponent,
    SpinnerComponent,
    TriviaResultComponent,
    NoDataFoundComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

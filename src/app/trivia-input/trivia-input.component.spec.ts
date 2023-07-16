import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaInputComponent } from './trivia-input.component';

describe('TriviaInputComponent', () => {
  let component: TriviaInputComponent;
  let fixture: ComponentFixture<TriviaInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviaInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

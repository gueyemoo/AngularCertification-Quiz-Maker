import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriviaResultComponent } from './trivia-result.component';

describe('TriviaResultComponent', () => {
  let component: TriviaResultComponent;
  let fixture: ComponentFixture<TriviaResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TriviaResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TriviaResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

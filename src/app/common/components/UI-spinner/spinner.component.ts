import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-spinner',
  template: `
    <img src="https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif"
         *ngIf="isLoading"/>
  `
})
export class SpinnerComponent {
  @Input() isLoading = false;
}

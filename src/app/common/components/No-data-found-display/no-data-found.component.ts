import { Component } from '@angular/core';

@Component({
  selector: 'app-data-not-found',
  template: `
    <div class="no-data-found">
      <h2>There is no result to show</h2>
      <p>Please do a quiz first.</p>
    </div>
  `,
  styles: [
    `
      .no-data-found {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh;
        font-size: 1.5rem;
        color: #333;
      }
    `,
  ],
})
export class NoDataFoundComponent {}

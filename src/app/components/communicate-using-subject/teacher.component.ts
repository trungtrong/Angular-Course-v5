import { Component, OnInit } from '@angular/core';
import { InteractionService } from './interaction.service';


@Component({
  selector: 'app-teacher',
  template: `
    <h2>Teacher</h2>
    <button (click)="greetStudent()">Greet Student</button>
    <button (click)="appreciateStudent()">Appreciate Student</button>
  `
})

export class TeacherComponent {
  // Step 1: inject InteractionService for passing message to that Service

  constructor(private _interactionService: InteractionService) {

  }

  greetStudent() {
    this._interactionService.sendMessage('Good Morning');
  }

  appreciateStudent() {
    this._interactionService.sendMessage('Done!');
  }

}

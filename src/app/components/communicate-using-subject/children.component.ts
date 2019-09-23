import { Component, OnInit } from '@angular/core';
import { InteractionService } from './interaction.service';

@Component({
  selector: 'app-child',
  template: `
    <h2>student</h2>
    <p> {{ message }} </p>
  `
})

export class ChildComponent implements OnInit {
  /*
    To receive message from Service
    - Step 1: Inject that InteractionService

    - Step 2: Child Using ngOnit() to subscribe that Observable
  */
  message: string;
  constructor(private _interactionService: InteractionService) { }

  ngOnInit() {
    this._interactionService.teacherMessage$
        .subscribe(
          messageFromTeacher => this.message = messageFromTeacher
        );
  }
}


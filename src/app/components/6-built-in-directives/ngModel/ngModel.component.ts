import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngmodel-example',
  template: `
    <label for="email">Email</label>
    <input type="email" [(ngModel)]="inputEmail">

    <br>
    {{ inputEmail }}
    <br>
    <button (click)="changeInput()">Change input</button>

  `
})

export class NgModelExampleComponent implements OnInit {
  inputEmail: string;
  constructor() { }

  ngOnInit() { }

  changeInput() {
    this.inputEmail = 'lala';
  }
}

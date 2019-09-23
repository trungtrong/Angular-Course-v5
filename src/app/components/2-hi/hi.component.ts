import { Component } from '@angular/core';

@Component({
  selector: 'app-hi',
  template: `
    <!-- property binding -->
    <h1 [textContent]="title"></h1>

    <!-- attribute binding -->
    <button [attr.class]="buttonClasses">Click on me</button>

    <!-- class binding -->
    <div [ngClass]="{
      'item': true,
      'special': true
      }">Class Binding</div>

    <!-- event binding -->
    <div [class.item]="changeItem"> Event Binding</div>
    <button (click)="onClick()">Change Color</button>
 `,
  styleUrls: ['./hi.component.css']
})
export class HiComponent {
  title = 'Hello Ajinomoto';
  buttonClasses = 'enale trigger';

  // event binding
  changeItem = true;
  onClick() {
    this.changeItem = !this.changeItem;
  }
}

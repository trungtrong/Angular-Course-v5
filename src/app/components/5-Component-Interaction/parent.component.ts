import { Component, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-parent',
  template: `
    <app-child [text]="title" (changeTitle)="changeTitleFromChild($event)"></app-child>
    <br>

    <h2>Parent {{parent}}</h2>
    <button (click)="changeTitle()">Change Parent Title</button>
  `
})

export class ParentComponent implements OnChanges {
  title = 'Hello';

  parent = 'Parent';
  i = 1;
  changeTitle() {
    this.title = `Parent ${this.i++}`;
  }

  ngOnChanges() {
    console.log('Hello Change');
  }

  // output from child
  changeTitleFromChild(text: string) {
    this.parent = text;
  }
}

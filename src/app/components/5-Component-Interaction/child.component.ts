import { Component,
         OnInit,
         Input,
         Output,
         OnChanges,
         EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child',
  template: `
    <h2>Bye {{ text }}</h2>
    <button (click)="changeChildText()">Change Child Text</button>
  `
})

export class ChildComponent implements OnInit, OnChanges {
  @Input() text: string;
  @Output() changeTitle = new EventEmitter<string>();
  count = 1;


  constructor() { }

  ngOnInit() { }

  ngOnChanges() {
    console.log('Hello Change');
  }

  changeChildText() {
    this.text = `${this.count++} Child Text`;
    this.changeTitle.emit(this.text);
  }
}


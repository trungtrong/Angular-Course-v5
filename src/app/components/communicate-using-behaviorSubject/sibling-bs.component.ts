import { Component, OnInit } from '@angular/core';
import { DataBsService } from './data-bs.service';

@Component({
  selector: 'app-sibling-bs',
  template: `
    <div>
      <h3>Sibling</h3>
      Message: {{ message }}
    </div>

    <button (click)="newMessage()">Change Message</button>
  `
})

export class SiblingBsComponent implements OnInit {
  message: string;

  // inject an dependency: service
  constructor(private data: DataBsService) { }

  ngOnInit() {
    this.data.currentMessage$.subscribe(msg => this.message = msg);
  }

  newMessage() {
    this.data.changeMessage('Hello from Sibling');
  }
}

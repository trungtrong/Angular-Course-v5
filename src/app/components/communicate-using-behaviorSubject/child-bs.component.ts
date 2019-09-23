import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataBsService } from './data-bs.service';

@Component({
  selector: 'app-child-bs',
  template: `
    <div>
      <h3>Child</h3>
      Message: {{ message }}
    </div>

    <button (click)="sendMsg()">From Child</button>


  `
})

export class ChildBsComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>(); // with emit() method
  message: string;

  // inject an dependency: service
  constructor(private data: DataBsService) { }

  ngOnInit() {
    this.data.currentMessage$.subscribe(msg => this.message = msg);
  }

  sendMsg() {
    this.messageEvent.emit('Form Child');
  }

}

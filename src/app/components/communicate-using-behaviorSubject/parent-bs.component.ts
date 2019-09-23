import { Component, OnInit } from '@angular/core';
import { DataBsService } from './data-bs.service';

@Component({
  selector: 'app-parent-bs',
  template: `
    <div>
      <h3>Parent</h3>
      Message: {{ message }}
      <app-child-bs (messageEvent)="newMessage($event)"></app-child-bs>
    </div>
  `
})

export class ParentBsComponent implements OnInit {
  message: string;

  // inject an dependency: service
  constructor(private data: DataBsService) { }

  ngOnInit() {
    this.data.currentMessage$.subscribe(msg => this.message = msg);
  }

  newMessage(data: string) {
    // this.message = data;
    this.data.changeMessage(data);
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-item',
  template: `
    <div [hidden]="!isActive">
      <ng-content></ng-content>
    </div>
  `
})

export class CarouselItemComponent implements OnInit {
  isActive = true;

  constructor() { }

  ngOnInit() { }
}



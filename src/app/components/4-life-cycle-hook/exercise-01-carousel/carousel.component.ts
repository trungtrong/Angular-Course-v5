import { Component, OnInit, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { CarouselItemComponent } from './carousel-item.component';

@Component({
  selector: 'app-carousel',
  template: `
    <div>
      <app-carousel-item>
        <img src="https://unsplash.it/200?image=0" alt="0">
      </app-carousel-item>

      <app-carousel-item>
        <img src="https://unsplash.it/200?image=100" alt="0">
      </app-carousel-item>

      <app-carousel-item>
        <img src="https://unsplash.it/200?image=200" alt="0">
      </app-carousel-item>

      <app-carousel-item>
        <img src="https://unsplash.it/200?image=300" alt="0">
      </app-carousel-item>
    </div>
  `
})

export class CarouselComponent implements AfterViewInit {
  delay = 2000;

  @ViewChildren(CarouselItemComponent) carouselItemList: QueryList<CarouselItemComponent>;

  constructor() { }

  ngAfterViewInit() {
    // list of images
    const carouselItems = this.carouselItemList.toArray();

    let count = 0;
    const max = carouselItems.length;

    // set time to move to the next image

    setInterval(() => {
      const index = count % max;

      carouselItems.forEach(item => item.isActive = false);
      carouselItems[index].isActive = true;

      count++;
    }, this.delay);
  }

}



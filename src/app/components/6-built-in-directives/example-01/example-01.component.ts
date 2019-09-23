import { Component } from '@angular/core';
import { Article } from './article';

@Component({
  selector: 'app-example',
  template: `
    <div class="container">
      <div class="col-sm-4 card" *ngFor="let article of articles">
      <div class="card-body">
        <h4 class="card-title"> {{ article.title }} </h4>
        <p class="card-text" *ngIf="article.kind === 'text'">
          {{ article.content }}
        </p>
        <small class="text-muted">
          Last updated {{ article.date | date: "shortDate" }}
        </small>
      </div>
      <img class="card-img-bottom" *ngIf="article.kind === 'image'"
        src="{{article.content}}">
      </div>
    </div>
  `
})

export class ExampleComponent {
  articles: Article[] = [
    new Article('Title 1', new Date(), 'Lorem ipsum', 'text'),
    new Article('Title 2', new Date(), 'https://unsplash.it/400?image=10', 'image'),
    new Article('Title 3', new Date(), 'Lorem sisksooans dodj', 'text'),
    new Article('Title 4', new Date(), 'https://unsplash.it/400?image=20', 'image')
  ];

}


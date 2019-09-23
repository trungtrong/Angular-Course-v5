import { Component} from '@angular/core';
import { Article } from '../article';

@Component({
  selector: 'app-article-list',
  template: `
    <app-article *ngFor="let a of articles" [article]="a">
    </app-article>
    <button type="button" class="btn"
            (click)="addArticle()">Add Article
    </button>
    <button type="button" class="btn"
            (click)="deleteArticle()">Clear Article
    </button>
  `
})

export class ArticleListComponent {
  articles: Article[] = [];
  constructor() {}

  addArticle() {
    this.articles.push(
      new Article(
        'What did the cheese say when it looked in the mirror',
        'Hello-me (Halloumi)'
      )
    );
  }

  deleteArticle() {
    this.articles = [];
  }
}

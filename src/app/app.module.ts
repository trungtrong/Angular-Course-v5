import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ArticleComponent } from './components/4-life-cycle-hook/article/article.component';
import { ArticleListComponent } from './components/4-life-cycle-hook/article-list/article-list.component';
import { PanelComponent } from './components/4-life-cycle-hook/panel/panel.component';
import { PanelListComponent } from './components/4-life-cycle-hook/panel-list/panel-list.component';
import { CarouselItemComponent } from './components/4-life-cycle-hook/exercise-01-carousel/carousel-item.component';
import { CarouselComponent } from './components/4-life-cycle-hook/exercise-01-carousel/carousel.component';
import { ChildComponent } from './components/5-Component-Interaction/child.component';
import { ParentComponent } from './components/5-Component-Interaction/parent.component';
import { NgIfNgTemplateComponent } from './components/6-built-in-directives/ngIf-and-ng-template/ngIf-ngtemplate.component';
import { NgModelExampleComponent } from './components/6-built-in-directives/ngModel/ngModel.component';
import { ExampleComponent } from './components/6-built-in-directives/example-01/example-01.component';


@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    ArticleListComponent,

    PanelComponent,
    PanelListComponent,

    CarouselItemComponent,
    CarouselComponent,

    ChildComponent,
    ParentComponent,

    NgIfNgTemplateComponent,
    NgModelExampleComponent,
    ExampleComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

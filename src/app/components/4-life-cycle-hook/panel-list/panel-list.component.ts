import {
  Component,
  OnInit,
  ViewChild,
  AfterContentInit,
  AfterViewInit,
  ViewChildren,
  QueryList,
  ContentChild,
  ContentChildren,
  ElementRef} from '@angular/core';

import { Panel } from '../panel';
import { PanelComponent } from '../panel/panel.component';

@Component({
  selector: 'app-panel-list',
  template: `
    <h3>View Panels</h3>
    <app-panel *ngFor="let p of panels" [panel]="p">
    </app-panel>

    <h3>Content Panels</h3>

    <!-- content projection -->
    <ng-content></ng-content>

  `
})

export class PanelListComponent
    implements OnInit,
              AfterViewInit,
              AfterContentInit {
  panels: Panel[]= [
    new Panel(
      'What did the cheese say when it looked in the mirror',
      'hello-me'
    ),
    new Panel(
      'What kind of cheese do you use to disguise a small horse',
      'mask-a-pony'
    )
  ];

  @ViewChild(PanelComponent) panelViewChild: PanelComponent;

  // b/c it has 2 panel in panels[]
  @ViewChildren(PanelComponent) panelViewChildren: QueryList<PanelComponent>;


  // Content
  @ContentChild(PanelComponent) panelContentChild: PanelComponent;
  @ContentChildren(PanelComponent) panelContentChildren: QueryList<PanelComponent>;


  constructor() {
  // panelViewChild property contains inthe constructor
    console.log(`new - panelViewChild is ${this.panelViewChild}`);
  }

  ngOnInit() {}

  ngAfterViewInit() {
    console.log(`ngAfterViewChild - panelViewChild is ${this.panelViewChild}`);

    const panels: PanelComponent[] = this.panelViewChildren.toArray();

    console.log(panels);

  }

  ngAfterContentInit() {
    console.log(`----- ngAfterContentChild - panelContentChild is ${this.panelContentChild}`);

    const contentList: PanelComponent[] = this.panelContentChildren.toArray();
    console.log('-----', contentList);
  }

}


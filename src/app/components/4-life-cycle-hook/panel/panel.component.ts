import { Component, Input } from '@angular/core';
import { Panel } from '../panel';

@Component({
    selector: 'app-panel',
    template: `
    <div class="panel-container">
      <h4 class="panel-title"> {{ panel.title }}</h4>
      <p class="panel-content" [hidden]="panel.hide">
        {{ panel.content }}
      </p>
      <button (click)="panel.toggle()">Tell Me</button>
    </div>
    `,
    styleUrls: ['./panel.component.css']
})

export class PanelComponent {
  @Input() panel: Panel;
}



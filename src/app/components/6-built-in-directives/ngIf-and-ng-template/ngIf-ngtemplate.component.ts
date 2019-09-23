import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ngif-ngtemplate',
  template: `
    <h2 *ngIf="sayYes; else sayNo">
      Say Yes
    </h2>

    <ng-template #sayNo>
      <h2>Say No</h2>
    </ng-template>
  `
})

export class NgIfNgTemplateComponent implements OnInit {
  sayYes = false;

  constructor() { }

  ngOnInit() { }
}


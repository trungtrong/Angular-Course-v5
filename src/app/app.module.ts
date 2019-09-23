import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { EmployeeService } from './employee.service';
import { EmployeeListComponent } from './components/employee/employee-list.component';
import { ChildComponent } from './components/communicate-using-subject/children.component';
import { TeacherComponent } from './components/communicate-using-subject/teacher.component';
import { InteractionService } from './components/communicate-using-subject/interaction.service';
import { ChildBsComponent } from './components/communicate-using-behaviorSubject/child-bs.component';
import { ParentBsComponent } from './components/communicate-using-behaviorSubject/parent-bs.component';
import { SiblingBsComponent } from './components/communicate-using-behaviorSubject/sibling-bs.component';
import { DataBsService } from './components/communicate-using-behaviorSubject/data-bs.service';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,

    ChildComponent,
    TeacherComponent,

    ChildBsComponent,
    ParentBsComponent,
    SiblingBsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [EmployeeService, InteractionService, DataBsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

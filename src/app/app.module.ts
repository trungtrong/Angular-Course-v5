import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { routingComponents, AppRoutingModule } from './app-routing.module';
import { EmployeeService } from '../app/employees/employee.service'
import { EmployeeListResolverService } from '../app/employees/employee-list.resolver.service'

@NgModule({
  declarations: [
    AppComponent,
    routingComponents
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [EmployeeService, EmployeeListResolverService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';
import { CreateEmployeeComponent } from './employees/create-employee/create-employee.component';
import { DisplayEmployeeComponent } from './employees/display-employee/display-employee.component';
import { EmployeeListResolverService } from './employees/employee-list.resolver.service';
import { EmployeeDetailsComponent } from './employees/employee-detail/employee-detail.component';

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  { path: 'list',
    component: EmployeeListComponent,
    resolve: {employeeList: EmployeeListResolverService}
  },
  {path: 'employees/:id', component: EmployeeDetailsComponent},
  {path: 'create', component: CreateEmployeeComponent},
  {path: 'edit/:id', component: CreateEmployeeComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }

export const routingComponents = [EmployeeListComponent,
                                  CreateEmployeeComponent,
                                  DisplayEmployeeComponent,
                                  EmployeeDetailsComponent];



/*
  1- Import { Routes, RouterModule }

  2- create export class AppRoutingModule {}

  3 - create { routes } const variable
    {path: '', redirectTo: '/list', pathMatch: 'full'},
    {path: 'list', component: EmployeeListComponent },
    {path: 'create', component: CreateEmployeeComponent}

  4- export const routingComponents = [EmployeeListComponent,
                                  CreateEmployeeComponent];

  5 - Adding
  @NgModule({
  declarations: [

    routingComponents
  ],
  imports: [
    AppRoutingModule
  ],

*/

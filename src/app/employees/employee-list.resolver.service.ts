import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()

export class EmployeeListResolverService implements Resolve<Employee[] | ErrorObservable> {

  // inject { EmployeeService } as we need it to retrieve employee data
  constructor(private _employeeService: EmployeeService) { }

  /* { Resolve } Interface contains the following one method for
    which we need to provide implementation.

    This method calls EmpService
    and returns { employee data }
  */
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Employee[] | ErrorObservable> {
    return this._employeeService.getEmployees()
      .pipe(
        catchError((err: string) =>
          new ErrorObservable('There is a problem with the service. We are notified and working on it. Please try again later')
          )
      ).delay(2000) ;
    }
}


/*
    ****** STEP 1:   Implement the Route Resolver Service

    import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../models/employee';
import { EmployeeService } from './employee.service';

@Injectable()

export class EmployeeListResolverService implements Resolve<Employee[]> {
  constructor(private _employeeService: EmployeeService) { }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Employee[]> {
    return this._employeeService.getEmployees();
  }
}

=> data that is received from { return } statement is casted into
   <employeeList>
     in resolve: {employeeList: EmployeeListResolverService }

=> { EmployeeListResolverService will provide the data }

NOTE: If { EmployeeListResolverService } fails
      => the path { list } is not { activated }
      => the { ListEmployeeComponent } will not displayed

              <Architect>

Component - Resolver Service - Angular Service - Server Side Service

  + Server Side Service provide data to Angular Service
  + Angular Service (employee.service ) provide data to Resolver service
  + Resolver Service provide data to component and that component will display

************************
  NOTE: Why { this._employeeService.getEmployees() } that is an Observable
    don't subscribe and it also receive data

    => b/c { an Observable Service } is being consumed by a { Resolver }
      + The { Resolver } will subscribe to the Observable { automatically }

-----------------------------------------------------------------------
        STEP 2: Register the { Route Resolver Service }
    in app.module.ts
  @NgModule {

     providers: [.., EmployeeListResolverService],
  }


-----------------------------------------------------------------------
        STEP 3: Add the { Route Resolver Service  } to the route
  for which we want to { pre-fetch data }

  - In this case, we want to route to { List } tab and pre-fetch
  data for { List } tab
  +
  const routes: Routes = [
    { path: 'list',
    component: EmployeeListComponent,
 =>   resolve: {employeeList: EmployeeListResolverService}
  }

-----------------------------------------------------------------------
      STEP 4: Read the pre-fetched data from ActivatedRoute

  constructor(private _employeeService: EmployeeService,
              private _route: ActivatedRoute) {
    this.employees = this._route.snapshot.data['employeeList'];
  }

  ngOnInit() {
    // shadow employees array on the first time
    this.filteredEmployees = this.employees;
  }

*/

import { Injectable, OnInit } from '@angular/core';
import { Employee } from '../models/employee';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';

@Injectable()

export class EmployeeService {

  // STEP 22: make a <GET> request
  private _url = 'http://localhost:3000/employees';

  constructor(private _httpClient: HttpClient) {  }


  /************  Way 1: using Observable  ************/
  // <GET> request
  getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(this._url)
                          .pipe(catchError(this.handleError));
  }

  // get one employee to VIEW employee and use to update/edit Form
  getEmployee(id: number): Observable<Employee> {
    return this._httpClient.get<Employee>(`${this._url}/${id}`)
          .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    } else {
      console.error('Server Side Error:', errorResponse);
    }

    // return an Observable with a meaning ful error message to the end user
    return new ErrorObservable('There is a problem with the service. We are notified and working on it. Please try again later');
  }

  // POST
  createEmployee(employee: Employee): Observable<Employee> {
    // STEP 24
    return this._httpClient.post<Employee>(this._url, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
        })
      })
      .pipe(catchError(this.handleError));
  }

  // PUT
  // When an update is performed our Server Side Service
  // It does not return anything => { updateEmployee} return void type
  updateEmployee(employee: Employee): Observable<void> {
    // post(url, data, header)
    return this._httpClient.put<void>(`${this._url}/${employee.id}`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    })
    .pipe(catchError(this.handleError));
  }

  deleteEmployee(id: number): Observable<void> {
    return this._httpClient.delete<void>(`${this._url}/${id}`)
            .pipe(catchError(this.handleError));
  }

}



/* STEP 13 in summary
  ******************** Way 1 ********************
        Using Observable

  import { Observable } from 'rxjs/Observable';
  import 'rxjs/add/observable/of';

  getEmployees(): Observable<Employee[]> {
    return Observable.of(this.listEmployees);
  }

  Step 2: Employee-list subscribe Observable from Service
  ngOnInit() {
    this._employeeService.getEmployees().subscribe(
      emp => this.employees = [...emp]
    );
  }


  ********************* Way 2 ******************
          Using BehaviorSubject
  - STEP 1:
    import { BehaviorSubject } from 'rxjs/BehaviorSubject';

  - STep 2:
    getEmployees = new BehaviorSubject<Employee[]>([...this.listEmployees]);

  NOTE: don't use
      getEmployees = new BehaviorSubject<E[]>(this.listEmployees)
    => this.listEmployees contains ADDRESS

    => getEmployees always references to { this.listEmployees }
    => always update data from { address of this.listEmployees }
      and we don't need { .next() } method => it's okay => This is a BUG

  SOLUTION: use
    new BS<>([ spread operator ]) => contains data of this address

  - STEP 3: next()
  save(employee: Employee) {

    this.getEmployees.next([...this.listEmployees]);

  }

  Step 3:  employee-list.comp.ts
  ngOnInit() {
    this._employeeService.getEmployees.subscribe(
      emp => this.employees = [...emp]
    );
  }


/*                  Way 2: BehaviorSubject             */
/*
  getEmployees = new BehaviorSubject<Employee[]>([...this.listEmployees]);

  save(employee: Employee) {
    // Step 1 of Step 9 (summary.md)
    this.listEmployees.push(employee);

    // STEP 13
    this.getEmployees.next([...this.listEmployees]);
  }
*/


/*            STEP 14 in summary.md

  Step 1: use { delay } operator
    getEmployees(): Observable<Employee[]> {
      return Observable.of(this.listEmployees).delay(2000);
    }

  NOTE: that means after 2s , Observable will emit data
    =>But { employee-list.comp.ts } implement async with {employee.service}
    =>

    ngOnInit() {
      this._employeeService.getEmployees().subscribe(
        emp => this.employees = [...emp]
      );
      => don't subscribe yet
      => after 2s , subscribing works

      // shadow employees array on the first time
      this.filteredEmployees = this.employees;

      => this filteredEmployees = { undefined } immediately
      => list employee will disappear
    }

  SOLUTION:
    Take { this.filteredEmployees = this.employees; } syntax into
    { subscribe } method
    => wait to subscribe OK => this.filteredEmp have value

*/

/*
                  STEP 19:

    save(employee: Employee) {
    // Step 1 of Step 9 (summary.md)
    // this.listEmployees.push(employee);

    // STEP 19: in the case , when creating the new employee => id =null

    if (employee.id === null) {
      // find the max length
      const maxId = this.listEmployees.length;

      // add a new id for new employee
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
    } else {
      // STEP 20: Update
      //  If id!= null =>  UPDATE task

     const verifiedIndex = this.listEmployees.findIndex(e => e.id === employee.id);
     this.listEmployees[verifiedIndex] = employee;
   }
 }

*/

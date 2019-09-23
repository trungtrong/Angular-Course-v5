import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../employee.service';

@Component({
  selector: 'app-employee-list',
  template: `
    <h2>Employee list</h2>
    <ul>
      <li *ngFor="let employee of employees">
        {{ employee.name }}
      </li>
    </ul>
  `
})

export class EmployeeListComponent implements OnInit {
  // Step 1: Create a store that contains the list of employee
  public employees = [];

  // Step 2: inject the employeeService
  constructor(private _employeeService: EmployeeService) { }

  // Step 3: using getEmployee() of EmployeeService to get data from service
  ngOnInit() {
    this.employees = this._employeeService.getEmployee();
  }
}

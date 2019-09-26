import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee';
import { ActivatedRoute } from '@angular/router';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html'
})

export class EmployeeListComponent implements OnInit {
  // Step 1
  employees: Employee[];

  // Step 2:
  filteredEmployees: Employee[];

  // Step 3: Using _searchTerm to contain data from { search field } async
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  constructor(private _route: ActivatedRoute) {
    const resolvedData: Employee[] | ErrorObservable = this._route.snapshot.data['employeeList'];

    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      console.error(resolvedData);
    }
  }

  ngOnInit() {
    // shadow employees array on the first time
    this.filteredEmployees = this.employees;
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1);
  }

  onDeleteNotification(id: number) {
    // verify that Id
    const verifiedIndex = this.filteredEmployees.findIndex(e => e.id === id);

    if (verifiedIndex !== -1) {
      this.filteredEmployees.splice(verifiedIndex, 1);
    }
  }
}

/*
  ********   STEP 1: keep entire List and make it consistent
  + employees: Employee[];

  + ngOnInit() {
      this.employees = this._employeeService.getEmployees();
    }

  ********  STEP 2: Using filteredEmployees: Employee[]
      to contain the list of employee when we type in search field
  + filteredEmployees: Employee[];

  + ngOnInit() {
    this.employees = this._employeeService.getEmployees();

    // shadow employees array on the first time
    this.filteredEmployees = this.employees;
  }

  + <div *ngFor="let employee of **** filteredEmployees ****">
      <app-display-employee [employee]="employee"></app-display-employee>
    </div>

  ********* Step 3: add { search field } in HTML

  <div class="form-group">
    <input type="text" class="form-control" placeholder="Search By Name"
      style="width: 300px" [(ngModel)]="searchTerm">
  </div>

  3-2:  Class:
  private _searchTerm: string;

  get searchTerm(): string {
    return this._searchTerm;
  }

  set searchTerm(value: string) {
    this._searchTerm = value;
    this.filteredEmployees = this.filterEmployees(value);
  }

  filterEmployees(searchString: string) {
    return this.employees.filter(employee =>
      employee.name.toLowerCase().indexOf(searchString.toLowerCase()) !== -1));
  }

*/

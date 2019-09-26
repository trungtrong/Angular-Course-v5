import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-detail.component.html'
})
export class EmployeeDetailsComponent implements OnInit {

  // Bai 21: navigating to employees/id router and retrieve data from id of employee
  // using retrieve the parameter value from the URL
  employee: Employee;

  constructor(private _route: ActivatedRoute,
              private _employeeService: EmployeeService) { }

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._employeeService.getEmployee(+id).subscribe(
      (emp: Employee) => this.employee = emp,
      (error: any) => console.log(error)
    );
  }
}

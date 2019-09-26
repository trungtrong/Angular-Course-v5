import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../../models/employee';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-display-employee',
  templateUrl: './display-employee.component.html'
})

export class DisplayEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() notifyDelete = new EventEmitter<number>();

  constructor(private _router: Router,
              private _employeeService: EmployeeService) { }

  ngOnInit() { }

  viewEmployee(employeeId: number) {
    this._router.navigate(['/employees', employeeId]);
  }

  editEmployee(employeeId: number) {
    this._router.navigate(['/edit', employeeId]);
  }

  deleteEmployee(employeeId: number) {
    this._employeeService.deleteEmployee(employeeId).subscribe(
      () => {},
      (error) => console.log(error)
    );

    // emit <ID> for <employee-list>
    this.notifyDelete.emit(+employeeId);
  }
}

/*
  *********** Step 10 - 2 of { summary }
  1 - B/c { employee } in display-emp.comp.html don't have { employee }
       => create { employee } property

       @Input employee: Employee;  // to receive data from parent{list-employee}

  2 - add { DisplayEmployeeComponent } to { app-routing }


*/


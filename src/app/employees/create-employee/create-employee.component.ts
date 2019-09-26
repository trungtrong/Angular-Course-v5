import { Component, OnInit, ViewChild } from '@angular/core';
import { Employee } from '../../models/employee';

import { NgForm } from '@angular/forms';
import { Department } from '../../models/department';
import { EmployeeService } from '../employee.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})

export class CreateEmployeeComponent implements OnInit {
  employee: Employee;

  formTitle: String;
  formButton: String;

  gender = 'Male';
  isActive = true;

  departments: Department[] = [
    { id: 1, name: 'Help Desk'},
    { id: 2, name: 'HR'},
    { id: 3, name: 'IT'},
    { id: 4, name: 'Payroll'}
  ];

  previewPhoto = false;
  buttonStatus = 'Show';

  currentId: number;
  currentPath = this._route.snapshot.routeConfig.path;

  // step 3-3
  @ViewChild('employeeForm') public createdEmployeeForm: NgForm;

  constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute) { }

  // STEP 20 in summary
  ngOnInit() {
    // retrieve route by using ActivatedRoute

    this._route.paramMap.subscribe(parameterMap => {

      this.currentId = +parameterMap.get('id');
      // after get ID from edit/id
      this.renderEmployee(this.currentId);
    });
  }

  renderEmployee(id: number) {
    /*
      id = 0 => Create task
      id > 0 => Edit= Update task
    */
    if (id === 0 || this.currentPath === 'create') {
      this.employee = {
        id: null,
        name: null,
        gender: 'Male',
        email: null,
        phoneNumber: null,
        dateOfBirth: null,
        department: '',
        isActive: true,
        photoPath: null
      };
      this.formTitle = 'Create Employee';
      this.formButton = 'Create';
    } else {
      this._employeeService.getEmployee(+id).subscribe(
        (emp: Employee) => this.employee = emp,
        (error: any) => console.log(error)
      );
      this.formTitle = 'Edit Employee';
      this.formButton = 'Update';
    }
  }

  saveEmployee(): void {
    /*  CREATE task
      b/c createEmployee() method returns an Observable
      => we must have to subscribe it
    */
    if (this.currentId === 0 || this.currentPath === 'create') {
      this._employeeService.createEmployee(this.employee).subscribe(
        (data: Employee) => {
          this.createdEmployeeForm.reset({
            gender: 'Male',
            department: '',
            isActive: true
          });

          this._router.navigate(['/list']);
        },
        (error: any) => console.log(error)
      );
    } else {
      // UPDATE task
      this._employeeService.updateEmployee(this.employee).subscribe(
        () => {
          this._router.navigate(['/list']);
        },
        (error: any) => console.log(error)
      );
    }
  }


  togglePreviewPhoto() {
    this.previewPhoto = !this.previewPhoto;
    this.buttonStatus = this.previewPhoto === true ? 'Hide' : 'Show';
  }
}

/*
  -  ************************ Step 1:

    When we don't use { employee } data from Employee Service

    + value of { name } attr = { [{ngModule}] }
    +
    gender = 'Male'; with [(ngModel)]="gender"
    isActive = true;

    departments: Department[] = [
      { id: 1, name: 'Help Desk'},
      { id: 2, name: 'HR'},
      { id: 3, name: 'IT'},
      { id: 4, name: 'Payroll'}
    ];

    +
    onSubmit(empForm: NgForm) {
      console.log(empForm.value);
    }

    ********************* STEP 2 :  Before making Validation
    + We use Model Binding in Angular
    + Step 2-2:
      employee: Employee = {
        id: null,
        name: null,
        gender: 'male',
        email: null,
        phoneNumber: null,
        dateOfBirth: null,
        department: null,
        isActive: true,
        photoPath: null
      };

    + Step 2-3: Edit all element
      [(ngModel)]="employee.name" #name="ngModel"

    **********  Validation
    1 - <form class="needs-validation" novalidate>
    3 - add required
    4 -  add invalid { text: name/ password/email/ select Department / Date of birth )
                <span class="invalid-feedback" *ngIf="name.invalid && name.touched" >
                  Full Name is required
                </span>

    5 - Add <script> to control Validation

    6 - NOTE: don't use { name.TOUCHED } property
      + b/c <form> uses { needs-validation } after the submitting


    7 - Error: Some element DON'T NEED Validation
      + Phone, PhotoPath
      + Solution: add a custom css

        .form-control-non-validate {     // like .form-control // but The diffrence is about name
          display: block;
          width: 100%;
          padding: .375rem .75rem;
          font-size: 1rem;
          line-height: 1.5;
          color: #495057;
          background-color: #fff;
          background-clip: padding-box;
          border: 1px solid #ced4da;
          border-radius: .25rem;
        }



    ********************* Step 3:
                  Click { Save } button and save to Service

    1 - save() in service
      save(employee: Employee) {
        this.listEmployees.push(employee);
      }

    2 - When using NgModel
      (ngSubmit)="onSubmit()"

    3 -: When using NgModel

    onsubmit() {
      this._employeeService.save(this.employee);

      // come back to { List } tab to see the additional elem
      this._router.navigate(['list']);
    }

    NOTE: When we do this => Although, { form } is invalid
      => It always goes to { list } tab    => BUG

    SOLUTION: We use  NgForm to check validation before going to { list } tab

    // Way 1: Sing-up / Create
    <button type="submit" [disabled]="employeeForm.invalid">

    // Way 2:  Sign in / log-in
    @ViewChild('employeeForm') public createdEmployeeForm: NgForm;

    onsubmit() {
      if (this.createdEmployeeForm.valid) {
        this._employeeService.save(this.employee);

        // come back to { List } tab to see the additional elem
        this._router.navigate(['list']);
      }
    }

    **********************   STEP 4:
      After submitting and reset the <form>

  onSubmit() {
    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);

    // reset form
    this.createdEmployeeForm.reset({
      gender: 'Male',
      department: '',
      isActive: true
    });
  }



*/

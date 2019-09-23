import { Injectable } from '@angular/core';

@Injectable()

export class EmployeeService {
  constructor() { }

  employees = [
    {id: 1, name: 'Trong', age: 24},
    {id: 2, name: 'Kim', age: 30},
    {id: 3, name: 'Long', age: 14},
    {id: 4, name: 'Tuan', age: 26}
  ];


  getEmployee() {
    return this.employees;
  }

}



/*
  - Step 1: add EmployeeService in @ngModule (app.module.ts)
  - Step 2:
  + Create employee-list.com
          and employee-detail.comp
  + Making some funtionality in 2 above component

  - Step 3: create getEmployee to return data



*/

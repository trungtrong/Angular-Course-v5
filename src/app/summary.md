<pre>
  - Step 1: Create an Angular application
-----------------------------------------------------------------------
  - Step 2: Adding Bootstrap 4
-----------------------------------------------------------------------
  - Step 3: Create { model } folder to contain all { data Interface } (pattern)
    + employee.ts
-----------------------------------------------------------------------
  - Step 4: Create { create-Employee } Component
      + using form to create a new employee
-----------------------------------------------------------------------
  - Step 5: Config { Basic ROUTING & Navigation }
           List  Create
    + add List-component and Create component into app-routing.module.ts
          ( see step 1 - 6 ) in app-routing

    + <div class="container"> in app.comp.html
    <nav class="navbar navbar-default">
        <ul class="nav navbar-nav">
          <li>
            <a routerLink='list'>List</a>
          </li>
          <li>
              <a routerLink='create'>Create</a>
          </li>
        </ul>
      </nav>
      <router-outlet></router-outlet>
    </div>
-----------------------------------------------------------------------
  - Step 6- Create template Driven Form in create-employee.component

    + Add FormModule into NgModule
-----------------------------------------------------------------------
  - Step 7: Design create-employee.com.html + Validation
                (  Step 1, 2 in create-employee.com.ts   )
    + name
    + email
    + phone number
    + gender (male/ female) - radio
    + checkbox (is Active)
    + dropdown list (department)
        . create { models/department.ts }  Interface

    + date picker (set date/time)
    + display /hide image
    + Submit button
-----------------------------------------------------------------------
  - STEP 8:  Bai 30
      + Create { employeeService } , that contains the real list of employee
        - getEmployees()
        -

      + Create { Employee-List } Component that contain list of employee
        1 - Employee-List.comp.ts
          + inject EmployeeService

          + retrieve data from Service
              - Way 1: Using ngOnInit()
              - Way 2: Using getter (accessor properties)

-----------------------------------------------------------------------
  - STEP 9: Using { Create } form to create and save an employee to Service
          (Step 3: In create-emp.comp.ts)
-----------------------------------------------------------------------
  - STEP 10: Split { list-employee.comp.html } to
    1 - list-employee = {
          display-employee
        }

    + list-emp: parent
    + display-emp: child

    See in display-emp.comp.ts
-----------------------------------------------------------------------
  - STEP 11: Submit and Reset the { Create Form }
    + Step 4 in Create-emp.comp.ts
-----------------------------------------------------------------------

  - STEP 12: Data Filtering
    See in employee-list.comp.ts
-----------------------------------------------------------------------
  - STEP 13: Using { Observable } for Service
        See Way 1 in employee.service.ts
    OR way 2: Using { BehaviorSubject }

    NOTE:
    + If we do as above, the data of list-employee is rendered immediately

    + but in the real world, we get data from server (database table)
      or SSR (server side render)
      We need to delay a duration 2s at least
-----------------------------------------------------------------------
  - STEP 14: Using { delay } property of Observable
    1 -{ delay } : (delay: number | Date, scheduler: Scheduler): Observable

    => Delay emit value for a duration

    2 - http://csharp-video-tutorials.blogspot.com/2018/05/create-observable-from-array.html


    SEE Step 14 in employee.service

    3 - Problem: In { List } tab
    + The nav-bar and search is loaded first =>BUG

    + And then after 2s => list employee will appear
    => while that duration => User have to wait

   ****** SOLUTION: Using { resolve guard }
    => We need to add { Router Navigation Events } + { SPINNER animation } (loading the page)
-----------------------------------------------------------------------
  - STEP 15:  Using { Resolve Guard }

  **** Application: To pre-fetch data for a route
    +  On the { Create } tab => we click { list } tab
      We are on the { Create } page in 2s

    +  After 2s, rendering the { data of list-employee } and { navbar and search field } at the same time

    1 -  Create { employee-list-resolver.service.ts } to do the
    { Resolve guard }
        See all step in employee-list-resolver.service.ts

-----------------------------------------------------------------------
  - STEP 16: Router Navigation Events

  1 - Log the router navigation events to the browser console
        IN { app-routing.module.ts }
  + adding { enableTracing: true }
  =>
    @NgModule({
      imports: [RouterModule.forRoot(routes, { enableTracing: true})],
      exports: [RouterModule]
    })

  2 - List Events
  NavigationStart
  NavigationEnd

  RoutesRecognized
  GuardsCheckStart
  GuardsCheckEnd

  NavigationCancel => is triggered when route navigation is cancelled
                      by a { Route Guard => CanDeactivate }
  NavigationError  =>  Appearing { unexpected error } when navigating                       from one routed to another route navigation


  ChildActivationStart
  ChildActivationEnd

  ActivationStart
  ActivationEnd

  ResolveStart
  ResolveEnd

-----------------------------------------------------------------------
      STEP 17: Loading Icon : How to display a loading indicator
  FOR all the route navigation: ko rieng qua List
    + When there is the wait time => The SPINNER appear


  1 - Using Router Navigation Events
    +  When the { NavigationStar }, we want to SHOW the { loading indicator }
    + When { NavigationEnd } => HIDE the { loading indicator }

  2 - TO BE ABLE to REACT and EXECUTE some code in response to the router navigation events

  => subscribe to the ANGULAR router events Observable

      2-1: Step 1: Modify { Root Component: AppComponent }

-----------------------------------------------------------------------

    STEP 18: <VIEW-> functionality

    1 - In display-employee.comp :  add <button> for each Employee in the list

    <button class="btn btn-primary" (click)="viewEmployee(employee.id)">
      View
    </button>

    2 -
    constructor(private _router: Router) { }

    => bind to the route using Router Service

    viewEmployee(employeeId: number) {
      this._router.navigate(['/employees', employeeId]);
    => When click :
        go to { employees/id } to { EmployeeDetailComp }
        (following routes in app-routing)
    }

    3 -  Get one Employee that is viewed from <employee-service.ts>

      // get one employee to VIEW employee and use to update/edit
      getEmployee(id: number) {
        return this.listEmployees.find(elem => elem.id === id);
      }

    4 - Create  { EmployeeDetailComp } to contain the employee is viewed

    export class EmployeeDetailsComponent implements OnInit {
      employee: Employee;

      constructor(private _route: ActivatedRoute,
              private _employeeService: EmployeeService) { }

      ngOnInit() {
        const id = this._route.snapshot.paramMap.get('id');
        this.employee = this._employeeService.getEmployee(+id);
      }
    }
  }

    4 - In each EmployeeDetailComp : add { Back to List }
        <!-- View button -->
      <button class="btn btn-primary" routerLink="/list">
        Back to List
      </button>



    4 - in { employee.service }: create getEmployee to get only 1 employee

    // get one employee to VIEW employee and use to update/edit
    getEmployee(id: number) {
      return this.listEmployees.find(elem => elem.id === id);
    }

    5- Make a route for { EmployeeDetailComp }

    const routes: Routes = [
      {path: 'employees/:id', component: EmployeeDetailsComponent},
    ]
-----------------------------------------------------------------------

  STEP 19: Repairing the { ID = null } when <create-> a <new-employee>
          employee-service.ts
  save() {
    if (employee.id === null) {
      // find the max length
      const maxId = this.listEmployees.length;

      // add a new id for new employee
      employee.id = maxId + 1;
      this.listEmployees.push(employee);
    }
  }

-----------------------------------------------------------------------
  STEP 20: <UPDATE->=<EDIT-> task
  => <we-reuse the {{ CREATE-emp.comp.ts }}>
   for <edit-form>

  1 - add the <path- for app-routing.comp>
    const routes: Routes = [
    ...
      {path: 'create', component: CreateEmployeeComponent},
      {path: 'edit/:id', component: CreateEmployeeComponent}    // for <EDIT-each-employee>
      => That means: edit/0 => createEmpCom with blank data
      => edit/1.. => createEmpComp with data
    ];

  2 - Make a router for <EDIT-button> - in <display-employee.comp>
    <button class="btn btn-secondary" (click)="editEmployee(employee.id)">
      Edit
    </button>

    editEmployee(employeeId: number) {  // go to <router-edit-id>
      this._router.navigate(['/edit', employeeId]);
    }

  3 -

  3-1- Retrieve path in <create-employee.comp-ts>
      => We depend on path of URL => to make CREATE or UPDATE

      constructor(private _employeeService: EmployeeService,
              private _router: Router,
              private _route: ActivatedRoute) { }

      // STEP 20 in summary
      ngOnInit() {
        // retrieve route by using ActivatedRoute

        this._route.paramMap.subscribe(parameterMap => {

        const id = +parameterMap.get('id');
        console.log('create-employee', id);
        // after get ID from edit/id
        this.renderEmployee(id);
      });
    }

  3-2-

    renderEmployee(id: number) {
    /*  id = 0 => Create task
        id > 0 => Edit= Update task

    */

    if (id === 0) {
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
      // UPDATE => render this data of this user that is chose
      this.employee = Object.assign({}, this._employeeService.getEmployee(id))
      this.formTitle = 'Edit Employee';
      this.formButton = 'Update';
    }
  }


  3-3- We want to

    onSubmit() {
    /* @ save data about employee
      Way 1: using ngForm
      this.employeeService.save(this.createdEmployeeForm.value);
    */

    // Way 2- Using NgModel

    const newEmployee: Employee = Object.assign({}, this.employee);
    this._employeeService.save(newEmployee);

    // retrieve current path
    const currentPath = this._route.snapshot.routeConfig.path;

    // reset form for { CREATE } task
    if (currentPath === 'create') {
      this.createdEmployeeForm.reset({
        gender: 'Male',
        department: '',
        isActive: true
      });
    }
    // we keep data that user typed on
    // and wait 2s - spinner animation
    // go to the { List } tab to see the Update
    else {
      // navigate to { List } tab for { Update } task => path = edit/:id
      this._router.navigate(['/list']);
    }

  }

-----------------------------------------------------------------------
    STEP 21: <DELETE-task>
  1 - add the <Delete-function-and-button> for <display-employee>
  <button class="btn btn-secondary" (click)="deleteEmployee(employee.id)">
    Delete
  </button>

  deleteEmployee(employeeId: number) {
    this._employeeService.deleteEmployee(employeeId);
  }

  2 - create <delete-method> for <employee-service>
  deleteEmployee(id: number) {
    const verifiedIndex = this.listEmployees.findIndex(e => e.id === id);

    if (verifiedIndex !== -1) {
      this.listEmployees.splice(verifiedIndex, 1);
    }
  }

  3 - Using <search-field> and <delete-employee-found>

      3-1- Provide <id-> from <display-emp> <when-we click delete> for <employee-list>
      for <filteredEmployee-changes immediately>

        - In <display-employee>:
        @Output() notifyDelete = new EventEmitter<number>();

        deleteEmployee(employeeId: number) {
          this._employeeService.deleteEmployee(employeeId);

          // emit <ID> for <employee-list>
          this.notifyDelete.emit(+this.employee.id);
        }

        - In <employee-list> receive <ID-> and refresh <filteredEmployee-data>
  <div class="card card-primary" *ngFor="let employee of filteredEmployees">
    <app-display-employee [employee]="employee" (notifyDelete)="onDeleteNotification($event)"></app-display-employee>
  </div>

    onDeleteNotification(id: number) {
    // verify that Id
    const verifiedIndex = this.filteredEmployees.findIndex(e => e.id === id);

    if (verifiedIndex !== -1) {
      this.filteredEmployees.splice(verifiedIndex, 1);
    }
  }
-----------------------------------------------------------------------
    STEP 22: <HTTP-GET> Request  -- <READING-in-CRUD>
  1 - Make db.json using <json-server --watch db.json>

  2 - <import-HttpClientModule> to { app.module.ts }
    import { HttpClientModule } from '@angular/common/http';

    - @NgModule({
      imports: [
        HttpClientModule
      ]

  3 - Using { employee.service.ts } and its functionality is make a <GET-POST-.... request>

    3-1 : import { HttpClient } service into {employee.service.ts}

    3-2: Inject { HttpClient } Service
    constructor(private _httpClient: HttpClient) {  }

    3-3: make a <GET-request> to get data

      private _url = 'http://localhost:3000/employees';

      getEmployees(): Observable<Employee[]> {
        return this._httpClient.get<Employee[]>(this._url);
      }

    3-4: In <employee-list.resolver.service.ts>
    + We don't need to subscribe => Explanation : see in its explanation

-----------------------------------------------------------------------
    STEP 23: <ERROR-hanlding>: in {Employee.service.ts}

  NOTE:
   + The server may reject the request and return an HTTP Response with a status code such as 404, 500

  1- Make the <handle-ERROR-method>

  import { HttpClient, HttpErrorResponse } from '@angular/common/http';

  import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

  private handleError(errorResponse: HttpErrorResponse) {
    // Client Side Error: appear when { EmployeeResolverService fails }

    if (errorResponse.error instanceof ErrorEvent) {
      console.error('Client Side Error:', errorResponse.error.message);
    }

    // Server Side error : when
        + error network
        + wrong URL, etc
    else {
      console.error('Server Side Error:', errorResponse);
    }

    // return an Observable with a meaning ful error message to the end user
  return new ErrorObservable('There is a problem with the service. We           are notified and working on it. Please try again later');
  }

  2 - <CATCH-error> while <GET-data>

  import { catchError } from 'rxjs/operators';

  getEmployees(): Observable<Employee[]> {
    return this._httpClient.get<Employee[]>(this._url)
                          .pipe(catchError(this.handleError));
  }
              --------------------------------------

        STEP 23-2: <Handling-angular-Resolver-Errors>
IDEA: Using EmployeeListResolverService to emit DATA or ERROR

NOTE: If { EmployeeListResolverService } fails
      => the path { list } is not { activated }
      => the { ListEmployeeComponent } will not displayed

              <Architect->
Component - Resolver Service - Angular Service - Server Side Service

  + Server Side Service provide data to Angular Service
  + Angular Service (employee.service ) provide data to Resolver service
  + Resolver Service provide data to component and that component will display

    1 - <employee-list.resolver.service.ts> will emit/provide
      either data or error

  1-1 -
    + The <resolver-return either an Employee[] or ErrorObservable>
    + Return { Employee[] } if the <resolver-is-successfull>
    + Return { ErrorObservable } if Error occurs

  ***
  export class EmployeeListResolverService implements Resolve
  <Employee[] | ErrorObservable> {

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<Employee[] | ErrorObservable> {
    return this._employeeService.getEmployees()
      .pipe(
        catchError((err: string) =>
          new ErrorObservable('There is a problem with the service. We are notified and working on it. Please try again later')
          )
      ).delay(2000) ;;
    }

        2- In <Employee-list.component.ts> will receive either data or error

  constructor(private _employeeService: EmployeeService,
              private _route: ActivatedRoute) {

    // + resolvedData is provided from { Employee-list.Resolver }
    // + resolvedData receive either Employee[] or ErrorObservable

    const resolvedData: Employee[] | ErrorObservable = this._route.snapshot.data['employeeList'];

    // If resolvedData is array = data of listEmployee
    if (Array.isArray(resolvedData)) {
      this.employees = resolvedData;
    } else {
      console.error(resolvedData);
    }
  }

-----------------------------------------------------------------------
    STEP 24: <POST-request> to <CREATE-employee>

  1 -  Change the Save() of <employee-service.ts>

  save(employee: Employee): Observable<Employee> {
    if (employee.id === null) {
      // STEP 24
      // http://csharp-video-tutorials.blogspot.com/2018/07/angular-httpclient-post-example.html
      // Using Http POST request to REStFull API
      // the data is added "id" automatically, the server will do this
      // we don't need to add "id" of the new employee manually

      // httpClient.post(url, data, header)
      return this._httpClient.post<Employee>(this._url, employee, {
          headers: new HttpHeaders({
            'Content-Type': 'application/json'
          })
        })
        .pipe(catchError(this.handleError));
    } else {.......}
  }


  2 - Change submit() in <create-employee.component.ts>

  onSubmit() {

    // using HttpPost => save() return Observable
    // subscribe(next(), error(), complete() )
    this._employeeService.save(this.employee).subscribe(
      (data: Employee) => {
        const currentPath = this._route.snapshot.routeConfig.path;

        if (currentPath === 'create') {
          this.createdEmployeeForm.reset({
            gender: 'Male',
            department: '',
            isActive: true
          });
        } else {
          this._router.navigate(['/list']);
        }
      },
      (error: any) => console.log(error)
    );
  }

-----------------------------------------------------------------------
    STEP 25: <PUT-request> to <UPDATE-employee>
0 - Remove  client <listEmployees-array> data


1 - Change / Split function createEmployee and updateEmployee in <employee-.service.ts>
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


2- change saveEmployee() method of button Save in <create-employee.comp.ts>


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

  and <HTML>
    <form #employeeForm="ngForm" (ngSubmit)="saveEmployee()">
  and <div class="card card-primary" *ngIf="employee">
      b/c the <default-employee-data> is undefined

3- Change/ get one employee to VIEW employee and use to update/edit Form
    getEmployee(id: number) {
      return this.listEmployees.find(elem => elem.id === id);
    }

  Using <GET-method> to get 1 employee depending on its id
    to VIEW or use to update/edit Form

  // get one employee to VIEW employee and use to update/edit Form
    getEmployee(id: number): Observable<Employee> {
      return this._httpClient.get<Employee>(`${this._url}/${id}`)
          .pipe(catchError(this.handleError));
    }

4- Subscribe getEmployee() in <render-employee>()-method

  renderEmployee(id: number) {
    if (id === 0 || this.currentPath === 'create') {
      ......
    } else {
      **** NOTE
      this._employeeService.getEmployee(+id).subscribe(
        (emp: Employee) => this.employee = emp,
        (error: any) => console.log(error)
      );
      this.formTitle = 'Edit Employee';
      this.formButton = 'Update';
    }
  }

5 - Subscribe getEmployee() in <employee-detail.comp.ts>
    // FOR <VIEW-task>

  ngOnInit() {
    const id = this._route.snapshot.paramMap.get('id');
    this._employeeService.getEmployee(+id).subscribe(
      (emp: Employee) => this.employee = emp,
      (error: any) => console.log(error)
    );
  }

-----------------------------------------------------------------------
    STEP 26: <DELETE-request> to <delete-task>

  1- In <employee-service.ts>
    deleteEmployee(id: number): Observable<void> {
      return this._httpClient.delete<void>(`${this._url}/${id}`)
            .pipe(catchError(this.handleError));
    }

  2 - In  <display-employee.comp.ts>

    deleteEmployee(employeeId: number) {
      this._employeeService.deleteEmployee(employeeId).subscribe(
        () => {},
        (error) => console.log(error)
    );

    // emit <ID> for <employee-list>
      this.notifyDelete.emit(+employeeId);
    }
</pre>

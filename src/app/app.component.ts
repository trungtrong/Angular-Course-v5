import { Component } from '@angular/core';
import { Router,
         NavigationStart,
         NavigationEnd,
         NavigationError,
         NavigationCancel,
         Event } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
    Step 1: We will use { showLoadingIndicator } to SHOW/HIDE
    the loading indicator
  */
  showLoadingIndicator = true;

  // Step 2: Inject the Angular Router
  constructor(private _router: Router) {

    // 2-2: Subscribe to the router events Observable
    this._router.events.subscribe((routerEvent: Event) => {

      // 2-3: On NavigationStart, set showLoadingIndicator = true
      if (routerEvent instanceof NavigationStart) {
        this.showLoadingIndicator = true;
      }

      // 2-4: On NavigationEnd or NavigationError or NavigationCancel
      if (routerEvent instanceof NavigationEnd ||
          routerEvent instanceof NavigationError ||
          routerEvent instanceof NavigationCancel ) {
        this.showLoadingIndicator = false;
      }
    });

  }
}

/*
  STEP 1: Add the trigger { showLoadingIndicator } property
  to trigger following the events
      (see all the specific events above)


  STEP 2: bind that trigger { showLoadingIndicator } property
          in app.comp.html

  <router-outlet *ngIf="showLoadingIndicator" class="spinner"></router-outlet>

  STEP 3: Add CSS Animation of SPINNER in app.comp.css

  +  If there is the wait time {go to LIST tab} => The SPINNER appear
  +  When clicking to { Create } tab
      => b/c NavigationStar and NavigationEnd appear => SPINNER disappear
*/

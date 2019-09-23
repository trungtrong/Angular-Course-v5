import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class InteractionService {
  // Step 1: creating a new instance of Subject
  private _teacherMessage = new Subject<string>();

  /*
    We expose a Subject to an Observable
    - We need to declare an Observable
      + The convention when declaring an Observable is to append { $ dollar sign }

    - asObservable() method return an Observable
  */
  teacherMessage$ = this._teacherMessage.asObservable();

  constructor() { }

  /* Step 2: This method that accept a message from { teacherComponent }
    + and pushes that message using the observable
  */
  sendMessage(message: string) {
    this._teacherMessage.next(message);
  }
}



/*
 - Step 1 : Setting Service using { Subject } class

 - Step 2 : From { Teacher } , making method to pass message to Service

 - Step 3 : { Children } to subscribe message from { InteractionService }

  https://stackoverflow.com/questions/39494058/behaviorsubject-vs-observable

  { Feature of Subject } :
  +  They are hot: code gets executed and value gets broadcast even if there is no observer.

  +  Shares data: Same data get shared between all observers.

  +  bi-directional: Observer can assign value to observable(origin/master).

  + If are using subject then you miss all the values that are
    broadcast before creation of observer
    -That means { Subject } have no the default value / initial value
     let a  = new Subject();
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()

export class DataBsService {
  // Create an instance of BehaviorSubject
  private messageSource = new BehaviorSubject<string>('Default message');

  // declaring an Observable
  currentMessage$ = this.messageSource.asObservable();

  constructor() {}

  // provide / distribute the next value

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

}


/*
   See on communicate using Subject -> Interaction.service.ts

*/

import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  myObservable$ = new Subject<number>();
  count = 0;
  constructor() { }

  next(): void
  {
    this.myObservable$.next(++this.count);
  }
}

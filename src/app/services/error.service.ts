import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  error: Error;
  errorSub = new Subject<Error>();

  constructor() { }


  handleError(error: Error): void {
    this.error = error;
    this.errorSub.next(this.error);
  }


  dismissError(): void {
    this.error = null;
    this.errorSub.next(null);
  }
}

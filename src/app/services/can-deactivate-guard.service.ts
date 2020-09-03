import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CanDeactivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

export interface CanComponentDeactivate {
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean
}

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateGuard implements CanDeactivate<CanComponentDeactivate> {
  canDeactivate(component: CanComponentDeactivate,
                _currentRoute: ActivatedRouteSnapshot,
                _currentState: RouterStateSnapshot,
                _nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean
  {
    return component.canDeactivate();
  }
}

import { 
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanLoad,
  Route
} from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private store: Store<fromRoot.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // needs to return boolean or promise/observable that resolves to true
    // returns Obs that returns true/false
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));

    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }

  canLoad(route: Route) {
    // observable constantly emits new values - guard only runs once - must use take(1)
    // to tell it to finish/cancel subscription after getting 1 value
    return this.store.select(fromRoot.getIsAuth).pipe(take(1));

    // if (this.authService.isAuth()) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    // }
  }
}

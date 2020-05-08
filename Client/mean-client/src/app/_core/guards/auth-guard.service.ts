import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import * as appActions from '../../state/app-actions';
import * as fromApp from '../../state';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private store: Store<fromApp.State>) { }

  canActivate(): Observable<boolean> {
    return this.store.pipe(select(fromApp.userLoggedIn),
      map(isLoggedIn => {
        if (isLoggedIn) {
          return true;
        }

        this.router.navigateByUrl('/login');
        return false;
      }));
  }
}

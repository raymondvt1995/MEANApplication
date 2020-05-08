import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as appActions from '../../state/app-actions';
import * as fromApp from '../../state';
import { Observable } from 'rxjs';
import { UserDetailsModel } from 'src/app/_models/user-details-model';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './snackbar/snackbar.component';

@Component({
  selector: 'app-shell',
  templateUrl: './shell.component.html',
  styleUrls: ['./shell.component.css']
})
export class ShellComponent implements OnInit {

  constructor(private store: Store<fromApp.State>, private router: Router, private _snackBar: MatSnackBar) { }

  isLoggedIn$: Observable<boolean>;
  userDetails$: Observable<UserDetailsModel>;
  errors$: Observable<string>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(fromApp.userLoggedIn));
    this.userDetails$ = this.store.pipe(select(fromApp.getUser));
    this.errors$ = this.store.pipe(select(fromApp.getError));

    this.errors$.subscribe(message => {
      if (message) {
        this.openSnackBar(message);
      }
    });

  }

  logoutUser(): void {
    this.store.dispatch(new appActions.LogoutUser());
    this.router.navigateByUrl('/welcome');
  }

  openSnackBar(message: string): void {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: 5 * 1000,
    });
  }
}

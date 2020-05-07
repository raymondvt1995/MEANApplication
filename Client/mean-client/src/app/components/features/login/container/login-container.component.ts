import { Component, OnInit, Input } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as appActions from '../../../../state/app-actions';
import * as fromApp from '../../../../state';
import { LoginUserModel } from 'src/app/_models/login-user-model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.css']
})
export class LoginContainerComponent implements OnInit {

  constructor(private store: Store<fromApp.State>) { }

  isLoggedIn$: Observable<boolean>;

  ngOnInit(): void {
    this.isLoggedIn$ = this.store.pipe(select(fromApp.userLoggedIn));
  }

  loginUser(user: LoginUserModel): void {
    this.store.dispatch(new appActions.LoginUser(user));
  }
}

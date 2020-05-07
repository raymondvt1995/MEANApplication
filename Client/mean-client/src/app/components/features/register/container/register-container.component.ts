import { Component, OnInit } from '@angular/core';
import { RegisterUserModel } from 'src/app/_models/register-user-model';
import { Store } from '@ngrx/store';
import * as appActions from '../../../../state/app-actions';
import * as fromApp from '../../../../state';

@Component({
  selector: 'app-register-container',
  templateUrl: './register-container.component.html',
  styleUrls: ['./register-container.component.css']
})
export class RegisterContainerComponent implements OnInit {

  constructor(private store: Store<fromApp.State>) { }

  ngOnInit(): void {
  }

  registerUser(user: RegisterUserModel): void {
    this.store.dispatch(new appActions.RegisterUser(user));
  }
}

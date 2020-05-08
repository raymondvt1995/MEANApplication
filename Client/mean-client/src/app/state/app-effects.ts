import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import * as appActions from './app-actions';
/* NgRx */
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { MeanAPIService } from '../services/mean-api.service';
import { UserDetailsModel } from '../_models/user-details-model';
import { LoginUserModel } from '../_models/login-user-model';
import { RegisterUserModel } from '../_models/register-user-model';

@Injectable()
export class AppEffects {
    constructor(private meanAPIService: MeanAPIService,
        private actions$: Actions) { }

    @Effect()
    loginUser$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoginUser),
        map((action: appActions.LoginUser) => action.payload),
        mergeMap((loginDetails: LoginUserModel) =>
            this.meanAPIService.loginUser(loginDetails).pipe(
                map(data => new appActions.LoginUserSuccess({ tokenDetails: data, email: loginDetails.email })),
                catchError(err => of(new appActions.LoginUserFailed(err)))
            )
        )
    );

    @Effect()
    registerUser$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.RegisterUser),
        map((action: appActions.RegisterUser) => action.payload),
        mergeMap((registerDetails: RegisterUserModel) =>
            this.meanAPIService.registerUser(registerDetails).pipe(
                map(data => new appActions.RegisterUserSuccess({ tokenDetails: data, email: registerDetails.email })),
                catchError(err => of(new appActions.RegisterUserFailed(err)))
            )
        )
    );

    @Effect()
    loadUser$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadUser),
        map((action: appActions.LoadUser) => action.payload),
        mergeMap((email: string) =>
            this.meanAPIService.loadUser(email).pipe(
                map(data => new appActions.LoadUserSuccess(data)),
                catchError(err => of(new appActions.LoadUserFailed(err)))
            )
        )
    );

    @Effect()
    deleteUser$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.DeleteUser),
        map((action: appActions.DeleteUser) => action.payload),
        mergeMap((id: string) =>
            this.meanAPIService.deleteUser(id).pipe(
                map(data => new appActions.DeleteUserSuccess(id)),
                catchError(err => of(new appActions.DeleteUserFailed(err)))
            )
        )
    );

    @Effect()
    loadAllUser$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.LoadAllUsers),
        map((action: appActions.LoadAllUsers) => action),
        mergeMap(() =>
            this.meanAPIService.loadAllUsers().pipe(
                map(data => new appActions.LoadAllUsersSuccess(data)),
                catchError(err => of(new appActions.LoadAllUsersFailed(err)))
            )
        )
    );

    @Effect()
    refreshToken$: Observable<Action> = this.actions$.pipe(
        ofType(appActions.AppActionTypes.RefreshToken),
        map((action: appActions.RefreshToken) => action.payload),
        mergeMap((refreshToken: string) =>
            this.meanAPIService.refreshToken(refreshToken).pipe(
                map(data => new appActions.RefreshTokenSuccess(data)),
                catchError(err => of(new appActions.RefreshTokenFailed(err)))
            )
        )
    );
}

import { Action } from '@ngrx/store';
import { RegisterUserModel } from '../_models/register-user-model';
import { TokenDetailsModel } from '../_models/token-details-model';
import { UserDetailsModel } from '../_models/user-details-model';
import { LoginUserModel } from '../_models/login-user-model';
import { AccessTokenModel } from '../_models/access-token-model';

export enum AppActionTypes {
    LoginUser = '[App] User Login',
    LoginUserSuccess = '[App] User Login Success',
    LoginUserFailed = '[App] User Login Failed',

    RegisterUser = '[App] Register User',
    RegisterUserSuccess = '[App] Register User Success',
    RegisterUserFailed = '[App] Register User Failed',

    LoadUser = '[App] Load User',
    LoadUserSuccess = '[App] Load User Success',
    LoadUserFailed = '[App] Load User Failed',

    LoadAllUsers = '[App] Load User',
    LoadAllUsersSuccess = '[App] Load All Users Success',
    LoadAllUsersFailed = '[App] Load All Users Failed',

    RefreshToken = '[App] Refresh Token',
    RefreshTokenSuccess = '[App] Refresh Token Success',
    RefreshTokenFailed = '[App] Refresh Token Failed',
}

export class LoginUser implements Action {
    readonly type = AppActionTypes.LoginUser;

    constructor(public payload: LoginUserModel) { }
}

export class LoginUserSuccess implements Action {
    readonly type = AppActionTypes.LoginUserSuccess;

    constructor(public payload: { tokenDetails: TokenDetailsModel, email: string }) { }
}

export class LoginUserFailed implements Action {
    readonly type = AppActionTypes.LoginUserFailed;

    constructor(public payload: string) { }
}

export class RegisterUser implements Action {
    readonly type = AppActionTypes.RegisterUser;

    constructor(public payload: RegisterUserModel) { }
}

export class RegisterUserSuccess implements Action {
    readonly type = AppActionTypes.RegisterUserSuccess;

    constructor(public payload: { tokenDetails: TokenDetailsModel, email: string }) { }
}

export class RegisterUserFailed implements Action {
    readonly type = AppActionTypes.RegisterUserFailed;

    constructor(public payload: string) { }
}


export class LoadUser implements Action {
    readonly type = AppActionTypes.LoadUser;

    constructor(public payload: string) { }
}

export class LoadUserSuccess implements Action {
    readonly type = AppActionTypes.LoadUserSuccess;

    constructor(public payload: UserDetailsModel) { }
}

export class LoadUserFailed implements Action {
    readonly type = AppActionTypes.LoadUserFailed;

    constructor(public payload: string) { }
}

export class LoadAllUsers implements Action {
    readonly type = AppActionTypes.LoadAllUsers;

    constructor() { }
}

export class LoadAllUsersSuccess implements Action {
    readonly type = AppActionTypes.LoadAllUsersSuccess;

    constructor(public payload: UserDetailsModel[]) { }
}


export class LoadAllUsersFailed implements Action {
    readonly type = AppActionTypes.LoadAllUsersFailed;

    constructor(public payload: string) { }
}


export class RefreshToken implements Action {
    readonly type = AppActionTypes.RefreshToken;

    constructor(public payload: string) { }
}

export class RefreshTokenSuccess implements Action {
    readonly type = AppActionTypes.RefreshTokenSuccess;

    constructor(public payload: AccessTokenModel) { }
}

export class RefreshTokenFailed implements Action {
    readonly type = AppActionTypes.RefreshTokenFailed;

    constructor(public payload: string) { }
}

export type AppActions = LoginUser |
    LoginUserSuccess |
    LoginUserFailed |
    RegisterUser |
    RegisterUserSuccess |
    RegisterUserFailed |
    LoadUser |
    LoadUserSuccess |
    LoadUserFailed |
    LoadAllUsers |
    LoadAllUsersSuccess |
    LoadAllUsersFailed |
    RefreshToken |
    RefreshTokenSuccess |
    RefreshTokenFailed;
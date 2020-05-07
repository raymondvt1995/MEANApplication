import { UserDetailsModel } from '../_models/user-details-model';
import { TokenDetailsModel } from '../_models/token-details-model';
import { AppActions, AppActionTypes } from './app-actions';

export interface AppState {
    isLoggedIn: boolean,
    email: string | null,
    user: UserDetailsModel | null,
    allUsers: UserDetailsModel[] | null,
    token: TokenDetailsModel | null,
    error: string | null
}

const initialAppState: AppState = {
    isLoggedIn: false,
    email: '',
    error: '',
    token: null,
    user: null,
    allUsers: null
};

export function reducer(state = initialAppState, action: AppActions): AppState {
    switch (action.type) {
        case AppActionTypes.LoginUserSuccess: {
            return {
                ...state,
                token: action.payload.tokenDetails,
                email: action.payload.email,
                isLoggedIn: true,
                error: ''
            };
        }

        case AppActionTypes.LoginUserFailed: {
            return {
                ...state,
                user: null,
                error: action.payload
            };
        }

        case AppActionTypes.RegisterUserSuccess: {
            return {
                ...state,
                token: action.payload.tokenDetails,
                email: action.payload.email,
                isLoggedIn: true,
                error: ''
            };
        }

        case AppActionTypes.RegisterUserFailed: {
            return {
                ...state,
                token: null,
                error: action.payload
            };

        }

        case AppActionTypes.LoadUserSuccess: {
            return {
                ...state,
                user: action.payload,
                error: ''
            };

        }

        case AppActionTypes.LoadUserFailed: {
            return {
                ...state,
                user: null,
                error: action.payload
            };

        }

        case AppActionTypes.LoadAllUsersSuccess: {
            return {
                ...state,
                allUsers: action.payload,
                error: ''
            };
        }

        case AppActionTypes.LoadAllUsersFailed: {
            return {
                ...state,
                allUsers: null,
                error: action.payload
            };
        }

        case AppActionTypes.RefreshTokenSuccess: {
            return {
                ...state,
                token: {
                    ...state.token,
                    accessToken: action.payload.token,
                    accessTokenExpiryTime: action.payload.expiryTime
                },
                error: ''
            };
        }

        case AppActionTypes.RefreshTokenFailed: {
            return {
                ...state,
                error: action.payload
            };
        }

        default:
            return state;
    }
}
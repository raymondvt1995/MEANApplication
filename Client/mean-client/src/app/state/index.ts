import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAppState from './app-reducer';

export interface State extends fromAppState.AppState {

}

const getAppRootState = createFeatureSelector<fromAppState.AppState>('appstate');

export const userLoggedIn = createSelector(
    getAppRootState,
    state => state.isLoggedIn
);

export const getUserEmail = createSelector(
    getAppRootState,
    state => state.email
);

export const getUser = createSelector(
    getAppRootState,
    state => state.user
);

export const getToken = createSelector(
    getAppRootState,
    state => state.token
);

export const getAllUsers = createSelector(
    getAppRootState,
    state => state.allUsers
);

export const getError = createSelector(
    getAppRootState,
    state => state.error
)
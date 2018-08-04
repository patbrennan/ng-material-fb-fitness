import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUI from './shared/ui.reducer';
import * as fromAuth from './auth/auth.reducer';

export interface State {
  ui: fromUI.State;
  auth: fromAuth.State;
}

export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAuth.authReducer,
  // training state is lazy-loaded; can't be added here.
};

// utility function that makes it easier, using feature selector, to pull info from State
// gives us way to call function to get quick access to the 'ui' state
export const getUIState = createFeatureSelector<fromUI.State>('ui');
// even easier way to get access - takes function that returns a slice of state, then uses
// imported state function to return a specific value
export const getIsLoading = createSelector(getUIState, fromUI.getLoadingState);

export const getAuthState = createFeatureSelector<fromAuth.State>('auth');
export const getIsAuth = createSelector(getAuthState, fromAuth.getIsAuth);

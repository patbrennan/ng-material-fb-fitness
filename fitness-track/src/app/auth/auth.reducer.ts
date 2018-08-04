import { AuthActions, SET_AUTH, SET_UNAUTH } from './auth.actions';

export interface State {
  isAuthenticated: boolean;
}

const initialState: State = {
  isAuthenticated: false,
};

export function authReducer(state = initialState, action: AuthActions) {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuthenticated: true,
      };

    case SET_UNAUTH:
      return {
        ...state,
        isAuthenticated: false,
      };

    default:
      return state;
  }
}

export const getIsAuth = (state: State) => state.isAuthenticated;

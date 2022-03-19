import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as authActions from './auth.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(authActions.setUser, (state, { user }) => ({ ...state, user: { ...user },  })),
  on(authActions.removeUser, (state) => ({ ...state, user: null }))
);

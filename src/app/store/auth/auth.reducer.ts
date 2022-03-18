import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { removeUser, setUser } from './auth.actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export const authReducer = createReducer(
  initialState,
  on(setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(removeUser, (state) => ({ ...state, user: null }))
);

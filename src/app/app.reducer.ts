import { ActionReducerMap } from '@ngrx/store';
import * as ui from './store/ui.reducer';
import * as auth from './store/auth/auth.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
};

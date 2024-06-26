import { ActionReducerMap } from '@ngrx/store';
import * as ui from './ui/ui.reducer';
import * as auth from './auth/auth.reducer';

export interface AppState {
  ui: ui.State;
  auth: auth.State;
}

export const AppReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer,
} ;

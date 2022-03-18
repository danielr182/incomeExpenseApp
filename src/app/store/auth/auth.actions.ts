import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/models/user.model';

export const setUser = createAction('[Auth] set User', props<{ user: User }>());
export const removeUser = createAction('[Auth] remove User');

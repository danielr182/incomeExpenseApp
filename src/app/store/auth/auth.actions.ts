import { createAction, props } from '@ngrx/store';
import { AuthUser } from 'src/app/models/authUser.model';
import { User } from 'src/app/models/user.model';

export const LOGOUT = '[Auth] logout User in fs Success';
export const registerUser = createAction('[Auth] register User in fs', props<{ authUser: AuthUser }>());
export const registerUserSuccess = createAction('[Auth] register User in fs Success');
export const loginUser = createAction('[Auth] login User in fs', props<{ authUser: AuthUser }>());
export const loginUserSuccess = createAction('[Auth] login User in fs Success');
export const logoutUser = createAction('[Auth] logout User in fs');
export const logoutUserSuccess = createAction(LOGOUT);
export const onError = createAction('[Auth] on Error in fs', props<{ payload: any }>());
export const setUser = createAction('[Auth] set User', props<{ user: User }>());
export const removeUser = createAction('[Auth] remove User');

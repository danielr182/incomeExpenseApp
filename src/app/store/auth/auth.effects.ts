import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as uiActions from '../ui/ui.actions';
import * as authActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

  loginUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.loginUser),
      mergeMap(({ authUser }) =>
        concat(
          of(uiActions.isLoading()),
          this.authService.loginUser(authUser).pipe(
            map(() => authActions.loginUserSuccess()),
            catchError((err) => of(authActions.onError({ payload: err })))
          )
        )
      )
    )
  );

  logoutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutUser),
      mergeMap(() =>
        concat(
          of(uiActions.isLoading()),
          this.authService.logoutUser().pipe(
            map(() => authActions.logoutUserSuccess()),
            catchError((err) => of(authActions.onError({ payload: err })))
          )
        )
      )
    )
  );

  logoutUserSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logoutUserSuccess),
      mergeMap(() => {
        return this.router.navigate(['/login']).then(() => uiActions.stopLoading());
      })
    )
  );

  registerUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerUser),
      mergeMap(({ authUser }) =>
        concat(
          of(uiActions.isLoading()),
          this.authService.createUser(authUser).pipe(
            map(() => authActions.registerUserSuccess()),
            catchError((err) => of(authActions.onError({ payload: err })))
          )
        )
      )
    )
  );

  registerOrLoginSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.registerUserSuccess, authActions.loginUserSuccess),
      mergeMap(() => {
        return this.router.navigate(['/']).then(() => uiActions.stopLoading());
      })
    )
  );

  onError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.onError),
      mergeMap(({ payload }) => {
        UtilsService.toast('error').fire({
          title: UtilsService.getErrorByCode(payload.code),
        });
        return of(uiActions.stopLoading());
      })
    )
  );
}

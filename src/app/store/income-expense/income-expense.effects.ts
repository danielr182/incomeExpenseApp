import { Injectable } from '@angular/core';
import { Actions, createEffect, EffectNotification, ofType } from '@ngrx/effects';
import { catchError, concat, exhaustMap, map, mergeMap, Observable, of, takeUntil, tap } from 'rxjs';
import { incomeExpenseConst } from 'src/app/constants/incomeExpense.constant';
import { ClearFormService } from 'src/app/services/clear-form.service';
import { IncomeExpenseService } from 'src/app/services/income-expense.service';
import { UtilsService } from 'src/app/services/utils.service';
import * as uiActions from '../ui/ui.actions';
import * as incomeExpenseActions from './income-expense.actions';

@Injectable()
export class IncomeExpenseEffects {
  constructor(
    private actions$: Actions,
    private clearFormService: ClearFormService,
    private incomeExpenseService: IncomeExpenseService
  ) {}

  addIncomeExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incomeExpenseActions.addIncomeExpense),
      mergeMap(({ incomeExpense }) =>
        concat(
          of(uiActions.isLoading()),
          this.incomeExpenseService.createIncomeExpense(incomeExpense).pipe(
            mergeMap(() => [
              incomeExpenseActions.addIncomeExpenseSuccess({ incomeExpensetype: incomeExpense.type }),
              uiActions.stopLoading(),
            ]),
            catchError((err) => concat(of(uiActions.stopLoading()), of(incomeExpenseActions.onError({ payload: err }))))
          )
        )
      )
    )
  );

  addIncomeExpenseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(incomeExpenseActions.addIncomeExpenseSuccess),
        tap(({ incomeExpensetype }) => {
          this.clearFormService.clearForm();
          UtilsService.toast('success').fire({
            title: `${incomeExpenseConst.type[incomeExpensetype]} creado`,
          });
        })
      ),
    { dispatch: false }
  );

  deleteIncomeExpense$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incomeExpenseActions.deleteIncomeExpense),
      mergeMap(({ incomeExpense }) =>
        concat(
          of(uiActions.isLoading()),
          this.incomeExpenseService.deleteIncomeExpense(incomeExpense.uid).pipe(
            mergeMap(() => [
              incomeExpenseActions.deleteIncomeExpenseSuccess({ incomeExpensetype: incomeExpense.type }),
              uiActions.stopLoading(),
            ]),
            catchError((err) => concat(of(uiActions.stopLoading()), of(incomeExpenseActions.onError({ payload: err }))))
          )
        )
      )
    )
  );

  deleteIncomeExpenseSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(incomeExpenseActions.deleteIncomeExpenseSuccess),
        tap(({ incomeExpensetype }) => {
          UtilsService.toast('success').fire({
            title: `${incomeExpenseConst.type[incomeExpensetype]} eliminado`,
          });
        })
      ),
    { dispatch: false }
  );

  onError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(incomeExpenseActions.onError),
        tap(({ payload }) => {
          UtilsService.toast('error').fire({
            title: UtilsService.getErrorByCode(payload.code),
          });
        })
      ),
    { dispatch: false }
  );

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incomeExpenseActions.getItems),
      mergeMap(() =>
        this.incomeExpenseService.getItems().pipe(
          map((items) => incomeExpenseActions.setItems({ items })),
          catchError((err) => of(incomeExpenseActions.onError({ payload: err })))
        )
      )
    )
  );

  ngrxOnRunEffects(resolvedEffects$: Observable<EffectNotification>): Observable<EffectNotification> {
    return this.actions$.pipe(
      ofType(incomeExpenseActions.initialized),
      exhaustMap(() => resolvedEffects$.pipe(takeUntil(this.actions$.pipe(ofType(incomeExpenseActions.destroyed)))))
    );
  }
}

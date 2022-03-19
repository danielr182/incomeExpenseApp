import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concat, map, mergeMap, of } from 'rxjs';
import { incomeExpenseConst } from 'src/app/constants/incomeExpenseConstants';
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
            map(() => incomeExpenseActions.addIncomeExpenseSuccess({ incomeExpensetype: incomeExpense.type })),
            catchError((err) => of(incomeExpenseActions.onError({ payload: err })))
          )
        )
      )
    )
  );

  addIncomeExpenseSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incomeExpenseActions.addIncomeExpenseSuccess),
      mergeMap(({ incomeExpensetype }) => {
        this.clearFormService.clearForm();
        UtilsService.toast('success').fire({
          title: `${incomeExpenseConst.type[incomeExpensetype]} creado`,
        });
        return of(uiActions.stopLoading());
      })
    )
  );

  onError$ = createEffect(() =>
    this.actions$.pipe(
      ofType(incomeExpenseActions.onError),
      mergeMap(({ payload }) => {
        UtilsService.toast('error').fire({
          title: UtilsService.getErrorByCode(payload.code),
        });
        return of(uiActions.stopLoading());
      })
    )
  );
}

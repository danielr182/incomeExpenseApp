import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';

export const addIncomeExpense = createAction(
  '[IncomeExpense] Add incomeExpense',
  props<{ incomeExpense: IncomeExpense }>()
);
export const addIncomeExpenseSuccess = createAction(
  '[IncomeExpense] Add incomeExpense Success',
  props<{ incomeExpensetype: string }>()
);
export const onError = createAction('[IncomeExpense] Error', props<{ payload: any }>());

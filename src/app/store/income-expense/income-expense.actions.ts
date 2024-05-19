import { createAction, props } from '@ngrx/store';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';

export const initialized = createAction('[IncomeExpense] Initialized');
export const destroyed = createAction('[IncomeExpense] Destroyed');

export const addIncomeExpense = createAction(
  '[IncomeExpense] Add incomeExpense',
  props<{ incomeExpense: IncomeExpense }>()
);
export const addIncomeExpenseSuccess = createAction(
  '[IncomeExpense] Add incomeExpense Success',
  props<{ incomeExpensetype: string }>()
);

export const deleteIncomeExpense = createAction(
  '[IncomeExpense] Delete incomeExpense',
  props<{ incomeExpense: IncomeExpense }>()
);
export const deleteIncomeExpenseSuccess = createAction(
  '[IncomeExpense] Delete incomeExpense Success',
  props<{ incomeExpensetype: string }>()
);

export const onError = createAction('[IncomeExpense] Error', props<{ payload: any }>());

export const getItems = createAction('[IncomeExpense] subscribe to Items in fs');
export const setItems = createAction('[IncomeExpense] set Items from fs', props<{ items: IncomeExpense[] }>());

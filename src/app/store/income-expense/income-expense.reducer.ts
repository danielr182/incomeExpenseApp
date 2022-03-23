import { createReducer, on } from '@ngrx/store';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';
import * as incomeExpenseActions from './income-expense.actions';

export interface State {
  items: IncomeExpense[];
}

export const initialState: State = {
  items: [],
};

export const incomeExpenseReducer = createReducer(
  initialState,
  on(incomeExpenseActions.setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(incomeExpenseActions.destroyed, (state) => ({ ...state, items: [] }))
);

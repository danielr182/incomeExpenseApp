import { createFeatureSelector, createSelector } from "@ngrx/store";
import { State } from "./income-expense.reducer";

const incomeExpenseFeatureKey = 'incomeExpense';
const incomeExpenseFeatureSelector = createFeatureSelector<State>(incomeExpenseFeatureKey);

const itemsIncomeExpenseSelector = createSelector(incomeExpenseFeatureSelector, (state: State) => state.items);

export const incomeExpenseSelectors = { itemsIncomeExpenseSelector };

import { IncomeExpenseType } from '../enums/incomeExpenseType.enum';

export const incomeExpenseConst: { type: { [key: string]: string } } = {
  type: {
    [IncomeExpenseType.income]: $localize`:@@income-type:Income`,
    [IncomeExpenseType.expense]: $localize`:@@expense-type:Expense`,
  },
};

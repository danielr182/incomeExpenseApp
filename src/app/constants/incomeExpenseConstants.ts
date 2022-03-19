import { IncomeExpenseType } from '../enums/incomeExpenseType.enum';

export const incomeExpenseConst: { type: { [key: string]: string } } = {
  type: {
    [IncomeExpenseType.income]: 'Ingreso',
    [IncomeExpenseType.expense]: 'Egreso',
  },
};

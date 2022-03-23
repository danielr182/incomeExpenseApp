import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenseType } from '../enums/incomeExpenseType.enum';
import { IncomeExpense } from '../models/incomeExpense.model';

@Pipe({
  name: 'incomeExpenseSort',
})
export class IncomeExpenseSortPipe implements PipeTransform {
  transform(items: IncomeExpense[]): IncomeExpense[] {
    return items.sort((a) => (a.type === IncomeExpenseType.income ? -1 : 1));
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { IncomeExpenseType } from 'src/app/enums/incomeExpenseType.enum';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';
import { UtilsService } from 'src/app/services/utils.service';
import { incomeExpenseSelectors } from 'src/app/store/income-expense/income-expense.selector';
import * as incomeExpenseActions from 'src/app/store/income-expense/income-expense.actions';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit, OnDestroy {
  incomeExpenseList: IncomeExpense[] = [];
  private subs$ = new Subscription();

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.subs$.add(
      this.store$
        .select(incomeExpenseSelectors.itemsIncomeExpenseSelector)
        .subscribe((items = []) => (this.incomeExpenseList = [...items]))
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  deleteItem(incomeExpense: IncomeExpense): void {
    this.store$.dispatch(incomeExpenseActions.deleteIncomeExpense({ incomeExpense }));
  }

  getClassName(typeCode: string): string {
    return typeCode === IncomeExpenseType.income ? 'text-success' : 'text-danger';
  }

  getTypeByCode(typeCode: string): string {
    return UtilsService.getTypeByCode(typeCode);
  }
}

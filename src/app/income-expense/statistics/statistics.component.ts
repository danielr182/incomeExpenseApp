import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { finalize, Subscription } from 'rxjs';

import { IncomeExpenseType } from 'src/app/enums/incomeExpenseType.enum';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';
import { incomeExpenseSelectors } from 'src/app/store/income-expense/income-expense.selector';
import { uiSelectors } from 'src/app/store/ui/ui.selector';
import * as uiActions from 'src/app/store/ui/ui.actions';
import { authSelectors } from 'src/app/store/auth/auth.selector';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss'],
})
export class StatisticsComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  incomeCount: number = 0;
  expenseCount: number = 0;
  incomeTotal: number = 0;
  expenseTotal: number = 0;
  private subs$ = new Subscription();
  private userLoaded: boolean = false;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.store$.dispatch(uiActions.isLoading());
    this.subs$.add(
      this.store$.select(uiSelectors.isLoadingSelector).subscribe((isLoading) => (this.isLoading = isLoading))
    );
    this.subs$.add(
      this.store$.select(authSelectors.userAuthSelector).subscribe((user) => (this.userLoaded = Boolean(user)))
    );
    this.subs$.add(
      this.store$.select(incomeExpenseSelectors.itemsIncomeExpenseSelector).subscribe((items) => {
        if (this.userLoaded && this.isLoading) {
          this.store$.dispatch(uiActions.stopLoading());
        }
        this.generateStatistics(items);
      })
    );
  }
  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  private generateStatistics(items: IncomeExpense[]): void {
    this.resetValues();
    items.map((item) => {
      if (IncomeExpenseType.income === item.type) {
        this.incomeTotal += Number(item.amount);
        this.incomeCount++;
      } else {
        this.expenseTotal += Number(item.amount);
        this.expenseCount++;
      }
    });
  }

  private resetValues(): void {
    this.incomeCount = 0;
    this.expenseCount = 0;
    this.incomeTotal = 0;
    this.expenseTotal = 0;
  }
}

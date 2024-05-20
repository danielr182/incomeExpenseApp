import { Component, Inject, LOCALE_ID, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { ChartData } from 'chart.js';

import { IncomeExpenseType } from 'src/app/enums/incomeExpenseType.enum';
import { IncomeExpense } from 'src/app/models/incomeExpense.model';
import { incomeExpenseSelectors } from 'src/app/store/income-expense/income-expense.selector';
import { uiSelectors } from 'src/app/store/ui/ui.selector';
import * as uiActions from 'src/app/store/ui/ui.actions';
import { authSelectors } from 'src/app/store/auth/auth.selector';
import { UtilsService } from 'src/app/services/utils.service';

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

  doughnutChartLabels: string[] = [$localize`:@@graph-income:Income`, $localize`:@@graph-expenses:Expenses`];
  doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{ data: [] }],
  };

  private subs$ = new Subscription();
  private userLoaded: boolean = false;

  constructor(private store$: Store, @Inject(LOCALE_ID) private locale: string) {}

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

  private generateStatistics(items: IncomeExpense[] = []): void {
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
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        {
          backgroundColor: ['#82E0AA', '#F1948A'],
          hoverBorderColor: ['#1ABC9C', '#EC7063'],
          hoverBackgroundColor: ['#1ABC9C', '#EC7063'],
          data: [this.incomeTotal, this.expenseTotal],
        },
      ],
    };
  }

  private resetValues(): void {
    this.incomeCount = 0;
    this.expenseCount = 0;
    this.incomeTotal = 0;
    this.expenseTotal = 0;
  }

  getClassName(): string {
    return this.incomeTotal - this.expenseTotal >= 0 ? 'text-success' : 'text-danger';
  }

  getCurrencyCode(): string {
    return UtilsService.getLocaleCurrencyCode(this.locale);
  }
}

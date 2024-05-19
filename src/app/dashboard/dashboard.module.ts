import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChartsModule } from 'ng2-charts';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from '../store/income-expense/income-expense.reducer';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { SharedModule } from '../shared/shared.module';
import { DashboardComponent } from './dashboard.component';
import { IncomeExpenseComponent } from '../income-expense/income-expense.component';
import { StatisticsComponent } from '../income-expense/statistics/statistics.component';
import { DetailComponent } from '../income-expense/detail/detail.component';
import { IncomeExpenseSortPipe } from '../pipes/income-expense-sort.pipe';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpenseComponent,
    StatisticsComponent,
    DetailComponent,
    IncomeExpenseSortPipe,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgChartsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule,
    StoreModule.forFeature('incomeExpense', incomeExpenseReducer),
  ],
})
export class DashboardModule {}

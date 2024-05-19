import { Component, OnDestroy, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { IncomeExpenseType } from '../enums/incomeExpenseType.enum';
import { IncomeExpense } from '../models/incomeExpense.model';
import { ClearFormService } from '../services/clear-form.service';
import * as incomeExpenseActions from '../store/income-expense/income-expense.actions';
import { uiSelectors } from '../store/ui/ui.selector';

@Component({
  selector: 'app-income-expense',
  templateUrl: './income-expense.component.html',
  styleUrls: ['./income-expense.component.scss'],
})
export class IncomeExpenseComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  incomeExpenseForm: UntypedFormGroup;
  incomeExpenseType = IncomeExpenseType;
  private subs$ = new Subscription();

  constructor(private clearFormService: ClearFormService, private fb: UntypedFormBuilder, private store$: Store) {}

  ngOnInit(): void {
    this.incomeExpenseForm = this.fb.group({
      amount: ['', Validators.required],
      description: ['', Validators.required],
      type: ['', Validators.required],
    });
    this.subs$.add(
      this.store$.pipe(select(uiSelectors.isLoadingSelector)).subscribe((isLoading) => (this.isLoading = isLoading))
    );
    this.subs$.add(this.clearFormService.clearForm$.subscribe(() => this.incomeExpenseForm.reset()));
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  addIncomeExpense(): void {
    const incomeExpense = this.incomeExpenseForm.value as IncomeExpense;
    this.store$.dispatch(incomeExpenseActions.addIncomeExpense({ incomeExpense }));
  }
}

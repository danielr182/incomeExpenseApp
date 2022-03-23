import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';

import { authSelectors } from '../store/auth/auth.selector';
import * as incomeExpenseActions from '../store/income-expense/income-expense.actions';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private store$: Store) {
    this.store$.dispatch(incomeExpenseActions.initialized());
    this.store$
      .select(authSelectors.userAuthSelector)
      .pipe(first((authUser) => Boolean(authUser)))
      .subscribe((authUser) => {
        if (authUser) {
          this.store$.dispatch(incomeExpenseActions.getItems());
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.store$.dispatch(incomeExpenseActions.destroyed());
  }
}

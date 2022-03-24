import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { authSelectors } from '../../store/auth/auth.selector';
import * as authActions from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  name: string;
  private subs$ = new Subscription();

  constructor(private store$: Store) { }

  ngOnInit(): void {
    this.subs$.add(
      this.store$
        .select(authSelectors.userAuthSelector)
        .subscribe((authUser) => {
          if (authUser) {
            this.name = authUser.name;
          }
        })
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  logout(): void {
    this.store$.dispatch(authActions.logoutUser());
  }
}

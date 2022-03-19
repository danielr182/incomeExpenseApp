import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as authActions from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private store$: Store) { }

  ngOnInit(): void {
  }

  logout(): void {
    this.store$.dispatch(authActions.logoutUser());
  }
}

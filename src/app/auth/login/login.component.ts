import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UtilsService } from 'src/app/services/utils.service';
import { uiSelectors } from 'src/app/store/ui/ui.selector';
import * as authActions from 'src/app/store/auth/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  loginForm: FormGroup;
  private subs$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.subs$.add(
      this.store$.pipe(select(uiSelectors.isLoadingSelector)).subscribe((isLoading) => (this.isLoading = isLoading))
    );
  }

  ngOnDestroy(): void {
    this.subs$.unsubscribe();
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }
    this.store$.dispatch(authActions.loginUser({ authUser: this.loginForm.value }));
  }

  isControlValid(controlName: string): boolean {
    return UtilsService.isControlValid(this.loginForm, controlName);
  }
}

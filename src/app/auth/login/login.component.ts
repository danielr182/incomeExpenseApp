import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { finalize, Subscription } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { uiSelectors } from 'src/app/store/ui.selector';
import * as uiActions from 'src/app/store/ui.actions';

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
    private authService: AuthService,
    private router: Router,
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

    this.store$.dispatch(uiActions.isLoading());
    this.subs$.add(
      this.authService
        .loginUser(this.loginForm.value)
        .pipe(finalize(() => this.store$.dispatch(uiActions.stopLoading())))
        .subscribe({
          next: () => {
            this.router.navigate(['/']);
          },
          error: (error) =>
            UtilsService.toast('error').fire({
              title: UtilsService.getErrorByCode(error.code),
            }),
        })
    );
  }

  isControlValid(controlName: string): boolean {
    return UtilsService.isControlValid(this.loginForm, controlName);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize, Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { AuthService } from '../../services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { uiSelectors } from 'src/app/store/ui.selector';
import * as uiActions from 'src/app/store/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  registerForm: FormGroup;
  private subs$ = new Subscription();

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private store$: Store
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
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

  createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.store$.dispatch(uiActions.isLoading());
    this.subs$.add(
      this.authService
        .createUser(this.registerForm.value)
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
    return UtilsService.isControlValid(this.registerForm, controlName);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { select, Store } from '@ngrx/store';

import { UtilsService } from 'src/app/services/utils.service';
import { uiSelectors } from 'src/app/store/ui/ui.selector';
import * as authActions from 'src/app/store/auth/auth.actions';

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
    this.store$.dispatch(authActions.registerUser({ authUser: this.registerForm.value }));
  }

  isControlValid(controlName: string): boolean {
    return UtilsService.isControlValid(this.registerForm, controlName);
  }
}

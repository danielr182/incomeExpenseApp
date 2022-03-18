import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  loginUser(): void {
    if (this.loginForm.invalid) {
      return;
    }

    UtilsService.showSpinner();
    this.authService.loginUser(this.loginForm.value).subscribe({
      next: () => {
        UtilsService.closeSpinner();
        this.router.navigate(['/']);
      },
      error: (error) =>
        UtilsService.toast('error').fire({
          title: UtilsService.getErrorByCode(error.code),
        }),
    });
  }

  isControlValid(controlName: string): boolean {
    return UtilsService.isControlValid(this.loginForm, controlName);
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  createUser(): void {
    if (this.registerForm.invalid) {
      return;
    }

    UtilsService.showSpinner();
    this.authService.createUser(this.registerForm.value).subscribe({
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
    return UtilsService.isControlValid(this.registerForm, controlName);
  }
}

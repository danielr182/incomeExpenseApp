import { FormGroup } from '@angular/forms';
import Swal, { SweetAlertIcon } from 'sweetalert2';

import { FirebaseErrors } from '../enums/firebaseErrors.enum';

export class UtilsService {
  constructor() {}

  static isControlValid(form: FormGroup, controlName: string): boolean {
    return form.get(controlName)?.valid ?? false;
  }

  static getErrorByCode(errorCode: string): string {
    let errorText = FirebaseErrors.generic;
    Object.entries(FirebaseErrors).map(([key, value]) => {
      if (key === errorCode) {
        errorText = value;
      }
    });
    return errorText;
  }

  static closeSpinner(): void {
    Swal.close();
  }

  static showSpinner(): void {
    Swal.fire({
      allowOutsideClick: false,
      background: 'transparent',
      didOpen: () => {
        Swal.showLoading()
      }
    });
  }

  static toast(type: SweetAlertIcon): typeof Swal {
    let background = '#ffffff';
    switch (type) {
      case 'error':
        background = '#fff1f1';
        break;
      case 'info':
        background = '#f1f1ff';
        break;
      case 'question':
        background = 'e5e5e5';
        break;
      case 'success':
        background = '#f8fff8';
        break;
      case 'warning':
        background = '#fffff1';
        break;
    }
    return Swal.mixin({
      toast: true,
      background,
      icon: type,
      showCloseButton: true,
      position: 'top',
      showConfirmButton: false,
      timer: 4000,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });
  }
}
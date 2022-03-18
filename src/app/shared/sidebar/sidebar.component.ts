import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  logout(): void {
    UtilsService.showSpinner();
    this.authService.logoutUser().subscribe({
      next: () => {
        UtilsService.closeSpinner();
        this.router.navigate(['/login']);
      },
      error: (error) =>
        UtilsService.toast('error').fire({
          title: UtilsService.getErrorByCode(error.code),
        }),
    });
  }

}

import { Component } from '@angular/core';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-profile',
  template: `
    <app-page-header [pageTitle]="'Profile'"></app-page-header>
    <button (click)="logOut()" pButton type="button" label="LogOUT"></button>
  `,
  styles: [],
})
export class ProfileComponent {
  constructor(private auth: AuthorizationService) {}
  logOut() {
    this.auth.logOut();
  }
}

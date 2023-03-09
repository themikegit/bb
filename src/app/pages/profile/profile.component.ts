import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-profile',
  template: `
    <app-page-header [pageTitle]="'Profile'"></app-page-header>
    <h3>{{ u?.email }}</h3>
    <button
      icon="pi pi-sign-out"
      (click)="logOut()"
      class="w-full"
      pButton
      type="button"
      label="LogOUT"
    ></button>
  `,
  styles: [],
})
export class ProfileComponent {
  constructor(
    private auth: AuthorizationService,
    private afa: AngularFireAuth
  ) {}
  u: any;
  ngOnInit() {
    this.afa.user.subscribe((u) => {
      // u?.updateProfile({
      //   displayName: 'admin',
      // });

      this.u = u;
    });
  }
  logOut() {
    this.auth.logOut();
  }
}

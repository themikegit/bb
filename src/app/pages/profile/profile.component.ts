import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, of } from 'rxjs';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-profile',
  template: `
    <app-page-header [pageTitle]="'Profile'"></app-page-header>
    <div *ngIf="user$ | async as user" class="p-3">
      <p-message
        *ngIf="!user.emailVerified"
        severity="warn"
        text="Please verify your email address"
        styleClass="mr-2 w-full"
      ></p-message>
      <div
        class="flex flex-column justify-content-evenly align-items-center wrap"
      >
        <div>
          <h1>{{ user.photoURL }} {{ user?.displayName }}</h1>
          <div class="flex align-items-center">
            <i
              class="pi pi-envelope text-primary p-1"
              style="font-size: 1rem"
            ></i>
            <p>{{ user?.email }}</p>
          </div>
        </div>
        <div></div>
        <button
          icon="pi pi-sign-out"
          (click)="logOut()"
          class="w-full mt-4"
          pButton
          type="button"
          label="Sign Out"
        ></button>
      </div>
    </div>
  `,
  styles: [
    `
      .wrap {
        height: calc(100vh - 120px);
      }
    `,
  ],
})
export class ProfileComponent {
  constructor(private auth: AuthorizationService) {}
  user$!: Observable<any>;

  ngOnInit() {
    this.user$ = of(JSON.parse(localStorage.getItem('user')!));
  }
  logOut() {
    this.auth.logOut();
  }
}

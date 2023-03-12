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

      <h3>{{ user.photoURL }} {{ user?.displayName }}</h3>
      <p>{{ user?.email }}</p>
      <button
        icon="pi pi-sign-out"
        (click)="logOut()"
        class=""
        pButton
        type="button"
        label="Sign Out"
      ></button>
    </div>
  `,
  styles: [],
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

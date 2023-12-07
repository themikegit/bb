import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navigation',
  template: `
    <div *ngIf="user$ | async as user" class="flex justify-content-around p-3">
      <button
        routerLink="home"
        pButton
        pRipple
        type="button"
        icon="pi pi-megaphone"
        class=" p-button-lg p-button-rounded p-button-text"
      ></button>
      <button
        routerLink="challenges"
        pButton
        pRipple
        type="button"
        icon="pi pi-list"
        class="p-button-lg p-button-rounded  p-button-text"
      ></button>

      <button
        routerLink="profile"
        pButton
        pRipple
        type="button"
        icon="pi pi-user"
        class=" p-button-lg p-button-rounded  p-button-text"
      ></button>
      <button
        *ngIf="
          user.uid === 'rLrCiR8gUfNoi680yg8G944kQg33' ||
          user.uid === 'yLo8VWJG0vaieyJtKdLomjUpUhV2'
        "
        routerLink="admin"
        pButton
        pRipple
        type="button"
        icon="pi pi-user-edit"
        class="p-button-lg p-button-rounded p-button-info  p-button-text"
      ></button>
    </div>
  `,
  styles: [],
})
export class NavigationComponent {
  constructor(private afa: AngularFireAuth) {}
  user$!: Observable<any>;
  ngOnInit() {
    this.user$ = this.afa.user;
  }
}

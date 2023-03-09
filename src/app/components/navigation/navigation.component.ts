import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navigation',
  template: `
    <div class="flex justify-content-around p-3">
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
        *ngIf="u === 'admin'"
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
  u: any;
  ngOnInit() {
    this.afa.user.subscribe((u) => {
      // u?.updateProfile({
      //   displayName: 'admin',
      // });

      this.u = u?.displayName;
    });
  }
}

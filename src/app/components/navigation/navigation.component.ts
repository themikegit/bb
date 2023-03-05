import { Component } from '@angular/core';

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
export class NavigationComponent {}

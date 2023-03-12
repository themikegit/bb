import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-sign-up',
  template: `
    <form
      [formGroup]="signForm"
      class="surface-card p-4 shadow-2 border-round w-full lg:w-6"
    >
      <div class="text-center mb-5">
        <!-- <img alt="Image" height="50" class="mb-3" /> -->
        <div class="text-900 text-3xl font-medium mb-3">Register</div>
        <span class="text-600 font-medium line-height-3"
          >You already have an account?</span
        >
        <a
          routerLink="/sign-in"
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >Log in</a
        >
      </div>

      <div>
        <div class="mb-3">
          <label for="sticker" class="block text-900 font-medium mb-2"
            >Avatar</label
          >
          <p-dropdown
            [options]="stickers"
            [(ngModel)]="selectedSticker"
            optionLabel="name"
            placeholder="Select your avatar"
            formControlName="sticker"
          >
            <ng-template pTemplate="selectedItem">
              <div *ngIf="selectedSticker">
                <div>{{ selectedSticker.name }}</div>
              </div>
            </ng-template>
            <ng-template let-stick pTemplate="item">
              <div>{{ stick.name }}</div>
            </ng-template>
          </p-dropdown>
        </div>

        <label for="nickname" class="block text-900 font-medium mb-2"
          >Nickname</label
        >
        <input
          id="nickname"
          type="text"
          placeholder="Add your nickname"
          pInputText
          class="w-full mb-3"
          formControlName="displayName"
        />
        <label for="email1" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <input
          id="email1"
          type="text"
          placeholder="Email address"
          pInputText
          class="w-full mb-3"
          formControlName="email"
        />

        <label for="password1" class="block text-900 font-medium mb-2"
          >Password</label
        >
        <input
          id="password1"
          type="password"
          placeholder="Password"
          pInputText
          class="w-full mb-3"
          formControlName="password"
        />

        <div class="flex align-items-center justify-content-between mb-6">
          <div class="flex align-items-center"></div>
        </div>

        <button
          pButton
          pRipple
          label="Sign Up"
          icon="pi pi-user-plus"
          class="w-full"
          (click)="submitForm()"
        ></button>
      </div>
    </form>
  `,
  styles: [],
})
export class SignUpComponent {
  @Input() type!: string;
  constructor(private auth: AuthorizationService) {}

  stickers = [
    { name: '🍏', code: 'apple' },
    { name: '🌶️ ', code: 'chili' },
    { name: '🥦', code: 'broccoli' },
  ];
  selectedSticker!: { name: string; code: string };

  signForm = new FormGroup({
    sticker: new FormControl(''),
    displayName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    this.auth.signUp(
      this.signForm.value,
      this.signForm.value.displayName,
      this.selectedSticker.name
    );
  }
}

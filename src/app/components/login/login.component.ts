import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';

import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';

import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',

  template: `
    <form
      [formGroup]="signForm"
      class="surface-card p-4 shadow-2 border-round w-full lg:w-6"
    >
      <div class="text-center mb-5">
        <img alt="Image" height="50" class="mb-3" />
        <div class="text-900 text-3xl font-medium mb-3">Welcome Back</div>
        <span class="text-600 font-medium line-height-3"
          >Don't have an account?</span
        >
        <a
          routerLink="/sign-up"
          class="font-medium no-underline ml-2 text-blue-500 cursor-pointer"
          >Create today!</a
        >
      </div>

      <div>
        <label for="email1" class="block text-900 font-medium mb-2"
          >Email</label
        >
        <input
          id="email1"
          type="text"
          placeholder="Email address"
          pInputText
          class="w-full mb-3"
          formControlName="username"
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
          <div class="flex align-items-center">
            <!-- <p-checkbox
              id="rememberme1"
              [binary]="true"
              styleClass="mr-2"
            ></p-checkbox> -->
            <!-- <label for="rememberme1" class="text-900">Remember me</label> -->
          </div>
          <!-- <a
            class="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer"
            >Forgot password?</a
          > -->
        </div>

        <button
          pButton
          pRipple
          label="Sign In"
          icon="pi pi-user"
          class="w-full"
          (click)="submitForm()"
        ></button>
      </div>
    </form>
  `,
  styles: [],
})
export class LoginComponent {
  @Input() type!: string;
  constructor(private auth: AuthorizationService) {}

  signForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    this.auth.logIn(this.signForm.value);
  }
}

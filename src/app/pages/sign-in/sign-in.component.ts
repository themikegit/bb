import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthorizationService } from 'src/app/services/authorization.service';

@Component({
  selector: 'app-sign-in',
  template: `
    <div class="flex justify-content-center">
      <form
        [formGroup]="signForm"
        class="surface-card p-4 shadow-2 border-round w-full lg:w-6"
      >
        <div class="text-center mb-5">
          <!-- <img alt="Image" height="50" class="mb-3" /> -->
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
            label="Sign In"
            icon="pi pi-user"
            class="w-full"
            (click)="submitForm()"
          ></button>
        </div>
      </form>
    </div>
  `,
  styles: [],
})
export class SignInComponent {
  @Input() type!: string;
  constructor(private auth: AuthorizationService) {}

  signForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  submitForm() {
    this.auth.logIn(this.signForm.value);
  }
}

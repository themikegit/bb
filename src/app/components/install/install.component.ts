import { Component } from '@angular/core';

@Component({
  selector: 'app-install',
  template: `
    <button
      icon="pi pi-sign-out"
      (click)="installApp()"
      class="w-full"
      pButton
      type="button"
      label="LogOUT"
    ></button>
  `,
  styles: [],
})
export class InstallComponent {
  deferredPrompt: any;

  constructor() {
    // this.swUpdate.available.subscribe(event => {
    //   console.log('Update available');
    //   window.location.reload();
    // });

    window.addEventListener('beforeinstallprompt', (event: any) => {
      console.log('beforeinstallprompt fired');
      event.preventDefault();
      this.deferredPrompt = event;
    });
  }

  installApp() {
    console.log(this.deferredPrompt);

    if (this.deferredPrompt) {
      // Show the installation prompt
      this.deferredPrompt.prompt();
      // Wait for the user to respond to the prompt
      this.deferredPrompt.userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User installed the app');
        } else {
          console.log('User declined to install the app');
        }
        // Clear the deferredPrompt object to prevent further prompts
        this.deferredPrompt = null;
      });
    }
  }
}

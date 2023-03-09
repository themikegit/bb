import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'mp-go';
  constructor(
    private primengConfig: PrimeNGConfig,
    private swUpdate: SwUpdate
  ) {
    this.swUpdate.versionUpdates.subscribe((event) => {
      console.log('Update available');
      window.location.reload();
    });

    window.addEventListener('beforeinstallprompt', (event: any) => {
      console.log('beforeinstallprompt fired');
      event.preventDefault();
      this.deferredPrompt = event;
      // Show a button or other UI element that invites the user to install the PWA
      this.showInstallButton();
    });
  }

  ngOnInit() {
    this.primengConfig.ripple = true;
  }
  deferredPrompt: any;

  showInstallButton() {
    const installButton = document.createElement('button');
    installButton.innerText = 'Install App';
    installButton.addEventListener('click', () => {
      // Trigger the installation prompt
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
    });
    // Add the button to your UI
    document.body.appendChild(installButton);
  }
}

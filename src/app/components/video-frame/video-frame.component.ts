import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-video-frame',
  template: `
    <div *ngIf="videoUrl">
      <iframe
        [src]="videoUrl | videoUrl"
        width="100%"
        height="100%"
        frameborder="0"
        allowfullscreen
      ></iframe>
    </div>
  `,
  styles: [],
})
export class VideoFrameComponent {
  @Input() videoUrl!: string;
}

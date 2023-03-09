import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'videoUrl',
})
export class VideoUrlPipe implements PipeTransform {
  constructor(protected _sanitizer: DomSanitizer) {}
  transform(value: string, ...args: unknown[]): unknown {
    return this._sanitizer.bypassSecurityTrustResourceUrl(value);
  }
}

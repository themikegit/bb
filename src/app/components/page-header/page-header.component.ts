import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-page-header',
  template: `
    <div class="pl-4 p-2">
      <h1>{{ pageTitle }}</h1>
    </div>
  `,
  styles: [],
})
export class PageHeaderComponent {
  @Input() pageTitle!: string;
}

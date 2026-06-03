import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterLink, RouterOutlet],
  template: `
    <main>
      <a [routerLink]="['/']" aria-label="Back to the Home Gallery landing page">
        <header class="brand-name">
          <img class="brand-logo" src="/assets/logo.svg" alt="Home Gallery logo" />
        </header>
      </a>
      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'homes';
}

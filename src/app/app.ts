import { Component, signal, ViewEncapsulation } from '@angular/core';
import { LoaderComponent } from './loader.component';
import { RouterOutlet, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LoaderComponent, RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css', '../assets/css/styles.css'],
  encapsulation: ViewEncapsulation.None
})
export class App {
  protected readonly title = signal('DICASS');
  public routerUrl: string = '';
  constructor(public router: Router) {
    if (router) {
      this.routerUrl = router.url || '';
      this.router.events.subscribe(() => {
        this.routerUrl = router.url || '';
      });
    }
  }
}

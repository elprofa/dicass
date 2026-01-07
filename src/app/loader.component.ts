
import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from './loader.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from './app.constants';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
  loading: boolean = false;
  private sub: any;
  constructor(private router: Router, public loader: LoaderService, private http: HttpClient, private cdr: ChangeDetectorRef) {}

  get isLoading() {
    return this.loading || this.loader.loading();
  }

  ngOnInit() {
    this.sub = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.loader.show();
        this.loading = true;
        this.cdr.detectChanges();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        this.loader.hide();
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
    // Optionnel : ping backend pour état global
    this.http.get<any>(`${BACKEND_URL}/status.php`).subscribe({
      next: (data: any) => {
        this.loading = !!data.loading;
        this.cdr.detectChanges();
      },
      error: () => {},
      complete: () => {}
    });
  }

  ngOnDestroy() {
    if (this.sub) this.sub.unsubscribe();
  }
}


import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, HttpClientModule]
})
export class SidebarComponent implements OnInit, OnDestroy {
  links: any[] = [];
  sections: any[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${BACKEND_URL}/sidebar.php`).subscribe({
      next: (data: any) => {
        this.links = data.links || [];
        this.sections = data.sections || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement du menu.';
        this.links = [];
        this.sections = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  ngOnDestroy(): void {
    if (typeof document !== 'undefined') {
      const backdrops = document.querySelectorAll('.offcanvas-backdrop');
      backdrops.forEach(bd => bd.parentNode?.removeChild(bd));
      document.body.classList.remove('modal-open');
    }
  }
}


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BACKEND_URL } from '../app.constants';

@Component({
  selector: 'app-offers',
  standalone: true,
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
  imports: [SidebarComponent, FooterComponent, CommonModule]
})
export class OffersComponent implements OnInit {
  offers: any[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any[]>(`${BACKEND_URL}/offers.php`).subscribe({
      next: (data: any[]) => {
        this.offers = data || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement des offres.';
        this.offers = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
}

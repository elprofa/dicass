
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  standalone: true,
  selector: 'app-your-order',
  imports: [CommonModule, RouterLink, FooterComponent, SidebarComponent, HttpClientModule],
  templateUrl: './your-order.component.html',
  styleUrls: ['./your-order.component.css']
})
export class YourOrderComponent implements OnInit {
  orders: any[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any[]>(`${BACKEND_URL}/orders.php`).subscribe({
      next: (data: any[]) => {
        this.orders = data || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement des commandes.';
        this.orders = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
}

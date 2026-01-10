import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-coupons',
  standalone: true,
  templateUrl: './coupons.component.html',
  styleUrls: ['./coupons.component.css'],
  imports: [SidebarComponent, FooterComponent, CommonModule, FormsModule]
})
export class CouponsComponent implements OnInit {
  coupons: any[] = [];
  expiredCoupons: any[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;
  codeInput: string = '';
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${BACKEND_URL}/coupons.php`).subscribe({
      next: (data: any) => {
        this.coupons = data.available || [];
        this.expiredCoupons = data.expired || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement des coupons.';
        this.coupons = [];
        this.expiredCoupons = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
  applyCoupon() {
    // Ajoutez ici la logique d'application du coupon si besoin
  }
}

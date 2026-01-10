
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  standalone: true,
  selector: 'app-cart',
  imports: [CommonModule, RouterLink, FooterComponent, SidebarComponent],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  items: any[] = [];
  deliveryFee: number = 2.00;
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any[]>(`${BACKEND_URL}/cart.php`).subscribe({
      next: (data: any[]) => {
        this.items = (data || []).map(item => ({
          ...item,
          img: item.image ? `${BACKEND_URL}/${item.image}` : 'placeholder.svg',
        }));
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement du panier.';
        this.items = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  goToCheckout() {
    if (this.items.length > 0) {
      this.router.navigate(['/checkout']);
    }
  }

  get total(): number {
    return this.subtotal + this.deliveryFee;
  }

  increment(item: any) {
    item.quantity++;
  }

  decrement(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    }
  }
}

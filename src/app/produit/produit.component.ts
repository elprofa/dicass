

import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../loader.service';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  standalone: true,
  selector: 'app-produit',
  imports: [CommonModule, RouterLink, FooterComponent, SidebarComponent, HttpClientModule],
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit {
  visibleCount: number = 10;
  products: any[] = [];
  totalProducts: number = 0;
  storeName: string | null = null;
  constructor(private http: HttpClient, private route: ActivatedRoute, private loader: LoaderService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.loader.show();
    this.route.queryParams.subscribe((params: {[key: string]: any}) => {
      const storeId = params['store'];
      if (storeId) {
        this.http.get<any[]>(`${BACKEND_URL}/store.php`).subscribe({
          next: (stores: any[]) => {
            const store = stores.find(s => String(s.id) === String(storeId));
            this.storeName = store ? store.name : null;
            this.cdr.detectChanges();
          },
          error: () => { this.storeName = null; this.cdr.detectChanges(); }
        });
      } else {
        this.storeName = null;
      }
    });
    this.http.get<any[]>(`${BACKEND_URL}/produits.php`).subscribe({
      next: (data: any[]) => {
        this.route.queryParams.subscribe((params: {[key: string]: any}) => {
          let filtered: any[] = data || [];
          if (params['store']) {
            filtered = filtered.filter((p: any) => String(p.store_id) === String(params['store']));
          }
          if (params['category']) {
            filtered = filtered.filter((p: any) => String(p.category_id) === String(params['category']));
          }
          if (params['lot']) {
            filtered = filtered.filter((p: any) => String(p.lot_id) === String(params['lot']));
          }
          this.products = (filtered || []).map((p: any) => ({
            ...p,
            img: p.image ? `${BACKEND_URL}/${p.image}` : 'placeholder.svg',
            meta: p.meta || '',
          }));
          this.totalProducts = (filtered || []).length;
          this.cdr.detectChanges();
        });
      },
      error: (err: any) => {
        console.error('Erreur backend produits:', err);
        this.products = [];
        this.totalProducts = 0;
      },
      complete: () => this.loader.hide()
    });
  }
  onLoadMore() {
    this.visibleCount += 10;
  }
}

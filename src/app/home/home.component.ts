import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../loader.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [CommonModule, RouterLink, FooterComponent, SidebarComponent, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
      lots: any[] = [];
    products: any[] = [];
  categories: any[] = [];
  stores: any[] = [];
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private loader: LoaderService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.loader.show();
                // Chargement dynamique des lots
    this.http.get<any[]>(`${BACKEND_URL}/lots.php`).subscribe({
      next: data => {
        this.lots = data.map(lot => ({
          ...lot,
          img: lot.images ? `${BACKEND_URL}/${lot.images.split(',')[0]}` : 'placeholder.svg',
        }));
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Erreur backend lots:', err);
        this.lots = [];
      },
      complete: () => this.loader.hide()
    });
            // Chargement dynamique des produits
    this.loader.show();
    this.http.get<any[]>(`${BACKEND_URL}/produits.php`).subscribe({
      next: data => {
        this.products = data
          .filter(p => Number(p.promotion) > 0)
          .map(p => ({
            ...p,
            img: p.image ? `${BACKEND_URL}/${p.image}` : 'placeholder.svg',
            meta: p.meta || '',
          }));
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Erreur backend produits:', err);
        this.products = [];
      },
      complete: () => this.loader.hide()
    });
        // Chargement dynamique des magasins
    this.loader.show();
    this.http.get<any[]>(`${BACKEND_URL}/store.php`).subscribe({
      next: data => {
        this.stores = data.map(s => ({
          ...s,
          img: s.image ? `${BACKEND_URL}/${s.image}` : 'placeholder.svg',
          route: '/search-list'
        }));
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Erreur backend store:', err);
        this.stores = [];
      },
      complete: () => this.loader.hide()
    });
    this.loader.show();
    this.http.get<any[]>(`${BACKEND_URL}/categories.php`).subscribe({
      next: data => {
        this.categories = data.map(c => ({
          ...c,
          img: c.image ? `${BACKEND_URL}/${c.image}` : 'placeholder.svg',
          route: '/search-list'
        }));
        this.errorMsg = null;
        this.cdr.detectChanges();
      },
      error: err => {
        console.error('Erreur backend:', err);
        this.categories = [];
        this.errorMsg = err.message || 'Erreur inconnue du backend';
      },
      complete: () => this.loader.hide()
    });
  }
}

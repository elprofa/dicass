import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../cart/cart.service';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoaderService } from '../loader.service';
import { BACKEND_URL } from '../app.constants';

@Component({
  selector: 'app-search',
  standalone: true,
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
  ,
  imports: [SidebarComponent, FooterComponent, CommonModule, RouterLink, FormsModule]
})
export class SearchComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  searchTerm: string = '';
  loading: boolean = false;
  addCartLoading: { [id: string]: boolean } = {};
  addCartMessage: { [id: string]: string } = {};
  addCartError: { [id: string]: string } = {};
  // Filtres dynamiques
  filterCategory: string = 'all';
  filterPrice: number = 50;

  constructor(
    private http: HttpClient,
    public loader: LoaderService,
    private cdr: ChangeDetectorRef,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.fetchProducts();
    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (q && typeof q === 'string') {
        this.searchTerm = q;
        // Attendre que les produits soient chargés avant de filtrer
        const trySearch = () => {
          if (this.products.length > 0) {
            this.onSearch(q);
          } else {
            setTimeout(trySearch, 100);
          }
        };
        trySearch();
      }
    });
  }

  applyFilters() {
    this.filteredProducts = this.products.filter(p => {
      const matchCat = this.filterCategory === 'all' || (p.category && p.category.toLowerCase() === this.filterCategory);
      const matchPrice = !p.price || +p.price <= this.filterPrice;
      return matchCat && matchPrice;
    });
  }

  resetFilters() {
    this.filterCategory = 'all';
    this.filterPrice = 50;
    this.filteredProducts = this.products;
  }
  addToCart(product: any) {
    const id = product.id || product.name;
    this.addCartLoading[id] = true;
    this.addCartMessage[id] = '';
    this.addCartError[id] = '';
    setTimeout(() => {
      try {
        this.cartService.addToCart(product);
        this.addCartLoading[id] = false;
        this.addCartMessage[id] = 'ok';
        setTimeout(() => {
          this.addCartMessage[id] = '';
        }, 2000);
      } catch (e: any) {
        this.addCartLoading[id] = false;
        this.addCartError[id] = e?.message || 'Erreur lors de l\'ajout au panier.';
        setTimeout(() => this.addCartError[id] = '', 3000);
      }
    }, 700);
  }

  fetchProducts() {
    this.loading = true;
    this.loader.show();
    this.http.get<any[]>(`${BACKEND_URL}/produits.php`).subscribe({
      next: (data: any[]) => {
        this.products = data.map(p => ({
          ...p,
          img: p.image ? `${BACKEND_URL}/${p.image}` : 'placeholder.svg',
          meta: p.meta || '',
        }));
        this.filteredProducts = this.products;
        this.loader.hide();
        this.cdr.detectChanges();
      },
      error: () => {
        this.products = [];
        this.filteredProducts = [];
        this.loader.hide();
        this.cdr.detectChanges();
      }
    });
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.loading = true;
    this.loader.show();
    setTimeout(() => {
      const t = term.trim().toLowerCase();
      this.filteredProducts = t
        ? this.products.filter(p => p.name.toLowerCase().includes(t) || p.meta.toLowerCase().includes(t))
        : this.products;
      this.loading = false;
      this.loader.hide();
    }, 500);
  }
}

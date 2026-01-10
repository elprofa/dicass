import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { LoaderService } from '../loader.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  standalone: true,
  selector: 'app-store',
  imports: [CommonModule, RouterLink, FooterComponent, SidebarComponent],
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
  stores: any[] = [];
  constructor(private http: HttpClient, private loader: LoaderService, private cdr: ChangeDetectorRef) {}
  ngOnInit() {
    this.loader.show();
    this.http.get<any[]>(`${BACKEND_URL}/store.php`).subscribe({
      next: (data: any[]) => {
        this.stores = data.map((s: any) => ({
          ...s,
          img: s.image ? `${BACKEND_URL}/${s.image}` : 'placeholder.svg',
        }));
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Erreur backend store:', err);
        this.stores = [];
        this.cdr.detectChanges();
      },
      complete: () => this.loader.hide()
    });
  }
}

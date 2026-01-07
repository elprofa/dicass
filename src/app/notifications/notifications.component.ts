
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  selector: 'app-notifications',
  standalone: true,
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [SidebarComponent, FooterComponent, HttpClientModule]
})
export class NotificationsComponent implements OnInit {
  notifications: any[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any[]>(`${BACKEND_URL}/notifications.php`).subscribe({
      next: (data: any[]) => {
        this.notifications = data || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement des notifications.';
        this.notifications = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
}

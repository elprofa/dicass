
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  standalone: true,
  selector: 'app-profile',
  imports: [CommonModule, FooterComponent, RouterLink, SidebarComponent, HttpClientModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any = null;
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${BACKEND_URL}/user.php`).subscribe({
      next: (data: any) => {
        this.user = data;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement du profil.';
        this.user = null;
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
}


import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css']
})
export class OrderConfirmComponent implements OnInit {
  confirmation: any = null;
  loading: boolean = false;
  errorMsg: string | null = null;
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${BACKEND_URL}/order-confirm.php`).subscribe({
      next: (data: any) => {
        this.confirmation = data;
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors de la confirmation de commande.';
        this.confirmation = null;
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
}

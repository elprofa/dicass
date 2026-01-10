import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../app.constants';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-wallet',
  standalone: true,
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
  ,
  imports: [SidebarComponent, FooterComponent, CommonModule]
})
export class WalletComponent implements OnInit {
  balance: number = 0;
  transactions: any[] = [];
  loading: boolean = false;
  errorMsg: string | null = null;
  filter: 'all' | 'credit' | 'debit' = 'all';
  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loading = true;
    this.http.get<any>(`${BACKEND_URL}/wallets.php`).subscribe({
      next: (data: any) => {
        this.balance = data.balance || 0;
        this.transactions = data.transactions || [];
        this.cdr.detectChanges();
      },
      error: err => {
        this.errorMsg = 'Erreur lors du chargement du portefeuille.';
        this.balance = 0;
        this.transactions = [];
        this.cdr.detectChanges();
      },
      complete: () => { this.loading = false; this.cdr.detectChanges(); }
    });
  }
  setFilter(f: 'all' | 'credit' | 'debit') { this.filter = f; }
  filteredTransactions() {
    if (this.filter === 'all') return this.transactions;
    if (this.filter === 'credit') return this.transactions.filter(t => t.type === 'credit');
    if (this.filter === 'debit') return this.transactions.filter(t => t.type === 'debit');
    return this.transactions;
  }
}

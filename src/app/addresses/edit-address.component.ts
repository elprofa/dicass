
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Address, AddressesService } from './addresses.service';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-edit-address',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, SidebarComponent, FooterComponent],
  templateUrl: './edit-address.component.html',
  styleUrls: ['./edit-address.component.css']
})
export class EditAddressComponent implements OnInit {
  address: Address | null = null;

  constructor(
    private route: ActivatedRoute,
    private addressesService: AddressesService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.addressesService.getAddresses().subscribe({
      next: (data: Address[]) => {
        this.address = data.find((a: Address) => a.id === id) || null;
      },
      error: () => {
        this.address = null;
      }
    });
  }

  onSubmit() {
    if (!this.address) return;
    const updated = {
      ...this.address,
      user_id: (this.address as any).user_id || 1,
      is_default: this.address.isDefault ? 1 : 0
    };
    this.addressesService.updateAddress(updated).subscribe({
      next: () => window.location.href = '/addresses',
      error: () => alert('Erreur lors de la mise à jour')
    });
  }
}

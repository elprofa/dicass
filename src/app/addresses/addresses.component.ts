import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { LoaderComponent } from '../loader.component';
import { RouterLink } from '@angular/router';
import { AddressesService, Address } from './addresses.service';
import { LoaderService } from '../loader.service';



@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css'],
  standalone: true,
  imports: [CommonModule, FooterComponent, SidebarComponent, LoaderComponent, RouterLink]
})
export class AddressesComponent implements OnInit {
  addresses: Address[] = [];
  showDropdown: { [id: number]: boolean } = {};

  constructor(
    private addressesService: AddressesService,
    public loader: LoaderService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loader.show();
    this.addressesService.getAddresses().subscribe({
      next: (data) => {
        this.addresses = data;
        this.loader.hide();
        this.cdr.detectChanges();
      },
      error: () => {
        this.addresses = [];
        this.loader.hide();
        this.cdr.detectChanges();
      }
    });
  }

  toggleDropdown(id: number) {
    this.showDropdown[id] = !this.showDropdown[id];
  }

  closeDropdown(id: number) {
    this.showDropdown[id] = false;
  }

  setDefault(id: number) {
    this.addresses.forEach(a => a.isDefault = false);
    const found = this.addresses.find(a => a.id === id);
    if (found) found.isDefault = true;
  }

  removeAddress(id: number) {
    this.addresses = this.addresses.filter(a => a.id !== id);
  }

  editAddress(id: number) {
    // À implémenter : navigation ou modal d'édition
    alert('Édition de l\'adresse non implémentée');
  }
}

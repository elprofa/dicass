import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

export interface PaymentMethod {
  id: number;
  brand: 'visa' | 'mastercard' | 'paypal';
  last4?: string;
  expiry?: string;
  isDefault?: boolean;
}

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css'],
  standalone: true,
  imports: [CommonModule, FooterComponent, SidebarComponent]
})
export class PaymentComponent {
  paymentMethods: PaymentMethod[] = [
    { id: 1, brand: 'visa', last4: '1234', expiry: '12/25', isDefault: true },
    { id: 2, brand: 'mastercard', last4: '5678', expiry: '08/26' },
    { id: 3, brand: 'paypal' }
  ];
  showDropdown: { [id: number]: boolean } = {};

  toggleDropdown(id: number) {
    this.showDropdown[id] = !this.showDropdown[id];
  }

  closeDropdown(id: number) {
    this.showDropdown[id] = false;
  }

  setDefault(id: number) {
    this.paymentMethods.forEach(m => m.isDefault = false);
    const found = this.paymentMethods.find(m => m.id === id);
    if (found) found.isDefault = true;
  }

  removeMethod(id: number) {
    this.paymentMethods = this.paymentMethods.filter(m => m.id !== id);
  }
}

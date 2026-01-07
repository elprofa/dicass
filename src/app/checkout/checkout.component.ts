import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { AddressesService, Address } from '../addresses/addresses.service';
import { CartService } from '../cart/cart.service';
import { PaymentMethod } from '../payment/payment.component';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  standalone: true,
  imports: [CommonModule, RouterLink, SidebarComponent]
})
export class CheckoutComponent implements OnInit {
  showItems = signal(true);

  get subtotal(): number {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
  deliveryFee = 2.00;
  discount = 0.00;
  get total(): number {
    return this.subtotal + this.deliveryFee - this.discount;
  }

  defaultAddress: Address | null = null;

  items: any[] = [];
  paymentMethods: PaymentMethod[] = [
    { id: 1, brand: 'visa', last4: '1234', expiry: '12/25', isDefault: true },
    { id: 2, brand: 'mastercard', last4: '5678', expiry: '08/26' },
    { id: 3, brand: 'paypal' }
  ];
  selectedPayment: PaymentMethod | null = null;

  constructor(private addressesService: AddressesService, private cartService: CartService) {}

  ngOnInit() {
    this.items = this.cartService.getItems();
    this.addressesService.getAddresses().subscribe({
      next: (addresses: Address[]) => {
        const found = addresses.find(a => a.isDefault);
        this.defaultAddress = found ? found : null;
      },
      error: () => {
        this.defaultAddress = null;
      }
    });
    this.selectedPayment = this.paymentMethods.find(m => m.isDefault) || this.paymentMethods[0] || null;
  }
}

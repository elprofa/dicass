import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CartService {
  private items: any[] = [];

  getItems() {
    return this.items;
  }

  addToCart(product: any) {
    // Vérifie si le produit existe déjà (par id)
    const found = this.items.find(item => item.id === product.id);
    if (found) {
      found.quantity = (found.quantity || 1) + 1;
    } else {
      this.items.push({ ...product, quantity: 1 });
    }
  }

  clearCart() {
    this.items = [];
  }

  removeFromCart(productId: any) {
    this.items = this.items.filter(item => item.id !== productId);
  }
}

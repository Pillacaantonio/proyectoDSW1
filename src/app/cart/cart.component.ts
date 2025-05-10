import { Component, OnInit } from '@angular/core';
import { CartService, CartItem } from './cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  calculateTotal(): void {
    this.total = this.cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }

  onQuantityChange(item: CartItem, event: any): void {
    const qty = +event.target.value;
    this.cartService.updateQuantity(item.productId, qty);
  }

  removeItem(item: CartItem): void {
    this.cartService.updateQuantity(item.productId, 0);
  }

  checkout(): void {
    const clienteId = 1; // reemplaza con ID real del cliente
    this.cartService.checkout(clienteId).subscribe({
      next: () => {
        this.cartService.clearCart();
        // redirigir o mostrar mensaje de éxito
      },
      error: err => console.error(err)
    });
  }
}
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export interface CartItem {
  productId: number;
  name: string;
  price: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.loadCart());
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor(private http: HttpClient) {}

  private loadCart(): CartItem[] {
    const data = localStorage.getItem('cart');
    return data ? JSON.parse(data) : [];
  }

  private saveCart(items: CartItem[]): void {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItemsSubject.next(items);
  }

  addItem(item: CartItem): void {
    const items = [...this.cartItemsSubject.value];
    const existing = items.find(i => i.productId === item.productId);
    if (existing) {
      existing.quantity += item.quantity;
    } else {
      items.push({ ...item });
    }
    this.saveCart(items);
  }

  updateQuantity(productId: number, quantity: number): void {
    const items = this.cartItemsSubject.value
      .map(i => i.productId === productId ? { ...i, quantity } : i)
      .filter(i => i.quantity > 0);
    this.saveCart(items);
  }

  clearCart(): void {
    this.saveCart([]);
  }

  checkout(clienteId: number): Observable<any> {
    const payload = {
      clienteId,
      items: this.cartItemsSubject.value.map(i => ({
        productId: i.productId,
        quantity: i.quantity,
        price: i.price
      }))
    };
    return this.http.post('/api/Pedidos/Checkout', payload);
  }
}
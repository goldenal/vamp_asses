import { Injectable } from '@nestjs/common';
import { CartItem } from './cart.types';

@Injectable()
export class CartStore {
  // Key: userId, Value: List of cart items
  private readonly carts = new Map<string, CartItem[]>();

  getCart(userId: string): CartItem[] {
    return this.carts.get(userId) || [];
  }

  setCart(userId: string, items: CartItem[]): void {
    this.carts.set(userId, items);
  }
}

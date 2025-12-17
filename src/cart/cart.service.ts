import { Injectable, BadRequestException } from '@nestjs/common';
import { CartStore } from './cart.store';
import { TimeService } from '../time/time.service';
import { PRODUCTS_STORE } from '../products/products.store';
import { CartItem } from './cart.types';

@Injectable()
export class CartService {
  constructor(
    private readonly cartStore: CartStore,
    private readonly timeService: TimeService,
  ) {}

  reserveItem(userId: string, productId: string): CartItem {
    // 1. Validate Product
    const product = PRODUCTS_STORE.find((p) => p.id === productId);
    if (!product) {
      throw new BadRequestException('Invalid product');
    }

    // 2. Get Current Cart & Clean Expiry
    // We must clean globally or per user? Requirements: "When reserving an item: Remove expired items from the cart"
    // "Expiry must be enforced: On every read, On every write"
    const currentItems = this.cleanExpiredItems(userId);

    // 3. Add new item
    const newItem: CartItem = {
      productId,
      reservedUntil: this.timeService.reserveUntil(5), // 5 minutes from specific server now
    };

    // Note: In a real system we would check stock here.
    // "This simulates inventory... Expiry is based on absolute timestamps... Remove expired items... Add item... Return"
    // I won't implement complex global stock locking unless requested, to keep it "minimal".
    // But I should probably prevent adding if stock < currentItems.filter(p => p.id).length ? 
    // Requirement says "Create a product store with fixed stock... This simulates inventory".
    // Let's implement a basic check against the simulated stock.

    const productInCartCount = currentItems.filter(i => i.productId === productId).length;
    if (productInCartCount >= product.stock) {
        throw new BadRequestException('Out of stock');
    }

    const updatedItems = [...currentItems, newItem];
    this.cartStore.setCart(userId, updatedItems);

    return newItem;
  }

  getCart(userId: string): { items: CartItem[]; serverTime: Date } {
    const items = this.cleanExpiredItems(userId);
    return {
      items,
      serverTime: this.timeService.now(),
    };
  }

  private cleanExpiredItems(userId: string): CartItem[] {
    const items = this.cartStore.getCart(userId);
    const now = this.timeService.now();
    const validItems = items.filter((item) => item.reservedUntil > now);
    
    // Only update store if there were expired items to avoid unnecessary writes (though in-memory is cheap)
    if (validItems.length !== items.length) {
      this.cartStore.setCart(userId, validItems);
    }
    
    return validItems;
  }
}

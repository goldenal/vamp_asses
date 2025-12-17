export interface CartItem {
    productId: string;
    reservedUntil: Date;
  }
  
  export interface Cart {
    items: CartItem[];
  }

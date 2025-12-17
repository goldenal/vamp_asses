export interface Product {
    id: string;
    name: string;
    stock: number;
  }
  
  export const PRODUCTS_STORE: Product[] = [
    { id: 'sku_1', name: 'Limited Sneakers', stock: 5 },
    { id: 'sku_2', name: 'Rare Hoodie', stock: 3 },
    { id: 'sku_3', name: 'Vintage Cap', stock: 10 },
    { id: 'sku_4', name: 'Denim Jacket', stock: 7 },
    { id: 'sku_5', name: 'Wireless Earbuds', stock: 20 },
    { id: 'sku_6', name: 'Smart Watch', stock: 15 },
    { id: 'sku_7', name: 'Gaming Mouse', stock: 8 },
    { id: 'sku_8', name: 'Mechanical Keyboard', stock: 12 },
    { id: 'sku_9', name: 'Portable Charger', stock: 25 },
    { id: 'sku_10', name: 'Bluetooth Speaker', stock: 18 },
  ];

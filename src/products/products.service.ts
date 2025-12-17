import { Injectable } from '@nestjs/common';
import { Product, PRODUCTS_STORE } from './products.store';

@Injectable()
export class ProductsService {
  getAll(): Product[] {
    return PRODUCTS_STORE;
  }
}

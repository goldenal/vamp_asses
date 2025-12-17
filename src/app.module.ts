import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { TimeService } from './time/time.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { CartStore } from './cart/cart.store';
import { ProductsController } from './products/products.controller';
import { ProductsService } from './products/products.service';

@Module({
  imports: [],
  controllers: [HealthController, CartController, ProductsController],
  providers: [TimeService, CartService, CartStore, ProductsService],
})
export class AppModule {}

import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CartService } from './cart.service';
import { ReserveItemDto } from './cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('reserve')
  reserve(@Body() dto: ReserveItemDto) {
    return this.cartService.reserveItem(dto.userId, dto.productId);
  }

  @Get()
  getCart(@Query('userId') userId: string) {
    return this.cartService.getCart(userId);
  }
}

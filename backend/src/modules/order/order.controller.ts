import { Body, Controller, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { OrderStatus } from '../../constants/enums';
import { OrderService, CartItem, Order } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly service: OrderService) {}

  @Post('orders/cart/items')
  addCartItem(@Body() body: CartItem): { message: string; item: CartItem } {
    return this.service.addCartItem(body);
  }

  @Post('orders')
  createOrder(@Body('userId') userId: number): Order {
    return this.service.createOrder(Number(userId));
  }

  @Get('orders')
  list(@Query('userId') userId?: string): Order[] {
    return this.service.list(userId ? Number(userId) : undefined);
  }

  @Patch('orders/:id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: OrderStatus): Order | null {
    return this.service.updateStatus(Number(id), status);
  }
}

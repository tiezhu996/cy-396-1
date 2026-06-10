import { Injectable } from '@nestjs/common';
import { OrderStatus } from '../../constants/enums';

type CartItem = { userId: number; productId: number; skuCode: string; quantity: number };
type Order = { id: number; userId: number; status: OrderStatus; totalAmount: number; items: CartItem[] };

@Injectable()
export class OrderService {
  private cart: CartItem[] = [];
  private orders: Order[] = [];

  addCartItem(item: CartItem) {
    this.cart.push(item);
    return { message: '已加入购物车', item };
  }

  createOrder(userId: number) {
    const items = this.cart.filter((item) => item.userId === userId);
    const order = { id: Date.now(), userId, status: OrderStatus.PendingPay, totalAmount: items.length * 68, items };
    this.orders.push(order);
    this.cart = this.cart.filter((item) => item.userId !== userId);
    return order;
  }

  updateStatus(id: number, status: OrderStatus) {
    const order = this.orders.find((item) => item.id === id);
    if (!order) return null;
    order.status = status;
    return order;
  }

  list(userId?: number) { return userId ? this.orders.filter((item) => item.userId === userId) : this.orders; }
}

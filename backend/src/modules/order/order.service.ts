import { Injectable } from '@nestjs/common';
import { OrderStatus } from '../../constants/enums';
import { ERROR_CODES } from '../../constants/error-codes';
import { AppException } from '../../common/errors/app.exception';
import { ProductService } from '../product/product.service';

export type CartItem = { userId: number; productId: number; skuCode: string; quantity: number };
export type OrderItem = CartItem & { unitPrice: number; subtotal: number };
export type Order = { id: number; userId: number; status: OrderStatus; totalAmount: number; items: OrderItem[] };

@Injectable()
export class OrderService {
  private cart: CartItem[] = [];
  private orders: Order[] = [];

  constructor(private readonly productService: ProductService) {}

  addCartItem(item: CartItem): { message: string; item: CartItem } {
    if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
      throw new AppException(ERROR_CODES.VALIDATION_FAILED, '加购数量必须为大于 0 的整数');
    }

    const product = this.productService.findById(item.productId);
    if (!product) {
      throw new AppException(ERROR_CODES.NOT_FOUND, '商品不存在');
    }

    const sku = product.skus.find((s) => s.code === item.skuCode);
    if (!sku) {
      throw new AppException(ERROR_CODES.NOT_FOUND, 'SKU 不存在');
    }

    const existingItem = this.cart.find(
      (c) => c.userId === item.userId && c.productId === item.productId && c.skuCode === item.skuCode,
    );
    const currentQty = existingItem ? existingItem.quantity : 0;
    const requestedQty = currentQty + item.quantity;

    if (requestedQty > sku.stock) {
      throw new AppException(ERROR_CODES.STOCK_NOT_ENOUGH, `库存不足，当前库存 ${sku.stock}，已加购 ${currentQty}，无法再加购 ${item.quantity}`);
    }

    if (existingItem) {
      existingItem.quantity = requestedQty;
    } else {
      this.cart.push({ ...item });
    }

    return { message: '已加入购物车', item };
  }

  createOrder(userId: number): Order {
    const cartItems = this.cart.filter((item) => item.userId === userId);
    if (cartItems.length === 0) {
      throw new AppException(ERROR_CODES.VALIDATION_FAILED, '购物车为空');
    }

    const orderItems: OrderItem[] = [];
    let totalAmount: number = 0;

    for (const cartItem of cartItems) {
      if (!Number.isInteger(cartItem.quantity) || cartItem.quantity <= 0) {
        throw new AppException(ERROR_CODES.VALIDATION_FAILED, '商品数量必须为大于 0 的整数');
      }

      const product = this.productService.findById(cartItem.productId);
      if (!product) {
        throw new AppException(ERROR_CODES.NOT_FOUND, `商品 ${cartItem.productId} 不存在`);
      }

      const sku = product.skus.find((s) => s.code === cartItem.skuCode);
      if (!sku) {
        throw new AppException(ERROR_CODES.NOT_FOUND, `SKU ${cartItem.skuCode} 不存在`);
      }

      if (cartItem.quantity > sku.stock) {
        throw new AppException(ERROR_CODES.STOCK_NOT_ENOUGH, `商品 ${product.name} 库存不足，当前库存 ${sku.stock}，需购买 ${cartItem.quantity}`);
      }

      const unitPrice: number = sku.price;
      const subtotal: number = unitPrice * cartItem.quantity;
      totalAmount += subtotal;

      orderItems.push({ ...cartItem, unitPrice, subtotal });
    }

    const order: Order = {
      id: Date.now(),
      userId,
      status: OrderStatus.PendingPay,
      totalAmount,
      items: orderItems,
    };

    for (const cartItem of cartItems) {
      this.productService.deductStock(cartItem.productId, cartItem.skuCode, cartItem.quantity);
      this.productService.addSales(cartItem.productId, cartItem.quantity);
    }

    this.orders.push(order);
    this.cart = this.cart.filter((item) => item.userId !== userId);

    return order;
  }

  updateStatus(id: number, status: OrderStatus): Order | null {
    const order = this.orders.find((item) => item.id === id);
    if (!order) return null;
    order.status = status;
    return order;
  }

  list(userId?: number): Order[] {
    return userId ? this.orders.filter((item) => item.userId === userId) : this.orders;
  }
}

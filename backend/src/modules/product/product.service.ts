import { Injectable } from '@nestjs/common';

export type ProductSku = { code: string; price: number; stock: number };
export type Product = { id: number; name: string; category: string; price: number; stock: number; specs: Record<string, string>; images: string[]; skus: ProductSku[]; sales: number };

@Injectable()
export class ProductService {
  private products: Product[] = [{ id: 1, name: '陶艺入门泥料包', category: 'pottery', price: 68, stock: 80, specs: { weight: '2kg' }, images: ['/uploads/clay.jpg'], skus: [{ code: 'CLAY-2KG', price: 68, stock: 80 }], sales: 15 }];

  create(payload: Omit<Product, 'id' | 'sales'>): Product {
    const product: Product = { ...payload, id: Date.now(), sales: 0 };
    this.products.push(product);
    return product;
  }

  list(query: { category?: string; keyword?: string }): Product[] {
    return this.products.filter((item) => (!query.category || item.category === query.category) && (!query.keyword || item.name.includes(query.keyword)));
  }

  bestSellers(): Product[] {
    return [...this.products].sort((a, b) => b.sales - a.sales);
  }

  findById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  deductStock(productId: number, skuCode: string, quantity: number): void {
    const product = this.findById(productId);
    if (!product) return;
    const sku = product.skus.find((s) => s.code === skuCode);
    if (sku) sku.stock -= quantity;
    product.stock -= quantity;
  }

  addSales(productId: number, quantity: number): void {
    const product = this.findById(productId);
    if (product) product.sales += quantity;
  }
}

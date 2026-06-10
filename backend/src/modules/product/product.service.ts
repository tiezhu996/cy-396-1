import { Injectable } from '@nestjs/common';

type Product = { id: number; name: string; category: string; price: number; stock: number; specs: Record<string, string>; images: string[]; skus: Array<{ code: string; price: number; stock: number }>; sales: number };

@Injectable()
export class ProductService {
  private products: Product[] = [{ id: 1, name: '陶艺入门泥料包', category: 'pottery', price: 68, stock: 80, specs: { weight: '2kg' }, images: ['/uploads/clay.jpg'], skus: [{ code: 'CLAY-2KG', price: 68, stock: 80 }], sales: 15 }];

  create(payload: Omit<Product, 'id' | 'sales'>) {
    const product = { ...payload, id: Date.now(), sales: 0 };
    this.products.push(product);
    return product;
  }

  list(query: { category?: string; keyword?: string }) {
    return this.products.filter((item) => (!query.category || item.category === query.category) && (!query.keyword || item.name.includes(query.keyword)));
  }

  bestSellers() { return [...this.products].sort((a, b) => b.sales - a.sales); }
}

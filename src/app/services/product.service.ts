import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productOnView: Product;
  productOnViewChanges = new Subject<Product>();

  productOnUpdate: Product;
  productOnUpdateChanges = new Subject<Product>();

  constructor() { }

  changeProductAtView(product: Product) {
    this.productOnView = product;
    this.productOnViewChanges.next(this.productOnView);
  }

  changeProductOnUpdate(product: Product) {
    this.productOnUpdate = product;
    this.productOnUpdateChanges.next(this.productOnUpdate);
  }
}

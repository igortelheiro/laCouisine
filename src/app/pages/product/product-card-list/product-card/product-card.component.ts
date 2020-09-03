import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';

import { ProductService } from './../../../../services/product.service';
import { Product } from './../../../../models/product.model';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input('product') product: Product;

  productAmount: number = 0;

  productView: Product;
  productViewChangesSub: Subscription;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productView = this.productService.productOnView;
    this.productViewChangesSub = this.productService.productOnViewChanges.subscribe(newProductView => this.productView = newProductView);
  }


  changeProductView(product: Product) {
    this.productService.changeProductView(product);
  }

}

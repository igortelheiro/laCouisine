import { CloudStorageService } from './../../../../services/cloudStorage.service';
import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from './../../../../models/product.model';
import { ProductService } from './../../../../services/product.service';

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

  imageToBeLoaded: string;

  constructor(private productService: ProductService, private cloudStorageService: CloudStorageService) { }


  ngOnInit(): void {
    this.productView = this.productService.productOnView;
    this.productViewChangesSub = this.productService.productOnViewChanges.subscribe(newProductView => this.productView = newProductView);
  }


  changeProductView(product: Product) {
    this.productService.changeProductAtView(product);
  }
}

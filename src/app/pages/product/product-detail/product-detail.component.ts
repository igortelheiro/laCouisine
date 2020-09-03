import { ProductService } from './../../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Product } from './../../../models/product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: Product;
  productViewChangesSub: Subscription;

  productOnUpdate: Product;
  productOnUpdateChangesSub: Subscription;

  productAddForm: FormGroup;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.product = this.productService.productOnView;
    this.productViewChangesSub = this.productService.productOnViewChanges.subscribe(newProductView => {
      this.product = newProductView;
      this.productService.changeProductUpdate(null);
    });

    this.productOnUpdate = this.productService.productOnUpdate;
    this.productOnUpdateChangesSub = this.productService.productOnUpdateChanges.subscribe(newProduct => this.productOnUpdate = newProduct);
  }


  onSwitchUpdateCard() {
    this.productService.changeProductUpdate(this.product);
  }


  onDeleteProduct() {
    console.log('deleted');
  }


  ngOnDestroy() {
    this.productService.changeProductUpdate(null);

    this.productViewChangesSub.unsubscribe();
    this.productOnUpdateChangesSub.unsubscribe();
  }

}

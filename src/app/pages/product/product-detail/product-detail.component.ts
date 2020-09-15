import { ProductDataService } from 'src/app/services/product-data.service';
import { CloudStorageService } from './../../../services/cloudStorage.service';
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
  productView: Product;
  productViewChangesSub: Subscription;

  productOnUpdate: Product;
  productOnUpdateChangesSub: Subscription;

  productAddForm: FormGroup;

  constructor(private productService: ProductService, private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.productView = this.productService.productOnView;
    this.productViewChangesSub = this.productService.productOnViewChanges.subscribe(newProductView => {
      this.productView = newProductView;
      this.productService.changeProductOnUpdate(null);
    });

    this.productOnUpdate = this.productService.productOnUpdate;
    this.productOnUpdateChangesSub = this.productService.productOnUpdateChanges.subscribe(newProduct => this.productOnUpdate = newProduct);
  }


  onSwitchUpdateCard() {
    this.productService.changeProductOnUpdate(this.productView);
  }


  onDeleteProduct() {
    this.productDataService.deleteMenu(this.productView);
  }


  ngOnDestroy() {
    this.productService.changeProductOnUpdate(null);

    this.productViewChangesSub.unsubscribe();
    this.productOnUpdateChangesSub.unsubscribe();
  }

}

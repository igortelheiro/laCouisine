import { ProductService } from './../../services/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit, OnDestroy {
  productCategory: string;

  productView: Product;
  productViewChangesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.productCategory = this.route.snapshot.params['produto'];

    this.productDataService.fetchProducts();

    this.productView = this.productService.productOnView;
    this.productViewChangesSub = this.productService.productOnViewChanges.subscribe(product => this.productView = product);

  }

  ngOnDestroy() {
    this.productViewChangesSub.unsubscribe();
  }
}

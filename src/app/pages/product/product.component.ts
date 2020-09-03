import { ProductService } from './../../services/product.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  productCategory: string;

  productList: Product[];
  productListChnagesSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.productCategory = this.route.snapshot.params['produto'];
    this.productService.changeProductView(this.productDataService.productList[0]);

    this.productList = this.productDataService.productList;
    this.productListChnagesSub = this.productDataService.productListChanges.subscribe(newProductList => this.productList = newProductList);
  }

}

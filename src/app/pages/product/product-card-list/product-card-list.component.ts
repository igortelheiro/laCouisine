import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-card-list',
  templateUrl: './product-card-list.component.html',
  styleUrls: ['./product-card-list.component.css']
})
export class ProductCardListComponent implements OnInit, OnDestroy {

  productList: Product[];
  productListChangesSub: Subscription;

  placeholderCard: Product = {
    name: 'Adicionar produto',
    imagePath: '../../../../assets/utilities/img_placeholder.png',
    price: 0,
    productionTime: 0,
    productionTimeUnit: 'min',
    ingredients: [],
  }

  constructor(private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.productList = this.productDataService.productList;
    this.productListChangesSub = this.productDataService.productListChanges.subscribe(newProductList => this.productList = newProductList);
  }

  ngOnDestroy() {
    this.productListChangesSub.unsubscribe();
  }
}

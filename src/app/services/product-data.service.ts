import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from 'src/app/models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  productList: Product[] = [
    {name: 'Torta mármore',
    imagePath: '../../../../assets/cardapios/torta_marmore.jpg',
    price: 30,
    productionTime: 30,
    productionTimeUnit: 'min',
    ingredients: [{name: 'mousse', amount: 200, measure: 'g'}],},

    {name: 'Torta de maçã',
    imagePath: '../../../../assets/cardapios/bolo_confeitado.jpg',
    price: 20.50,
    productionTime: 45,
    productionTimeUnit: 'min',
    ingredients: [{name: 'maçã', amount: 200, measure: 'g'}],},

    {name: 'Brigadeiro',
    imagePath: '../../../../assets/cardapios/doce.jpg',
    price: 8,
    productionTime: 1,
    productionTimeUnit: 'hr',
    ingredients: [{name: 'chocolate', amount: 200, measure: 'g'}],},

    {name: 'Chocotone',
    imagePath: '../../../../assets/cardapios/chocotone.jpg',
    price: 25,
    productionTime: 1,
    productionTimeUnit: 'dia',
    ingredients: [{name: 'chocolate', amount: 500, measure: 'kg'}],},

    {name: 'Açaí',
    imagePath: '../../../../assets/cardapios/acai.jpg',
    price: 15.5,
    productionTime: 2,
    productionTimeUnit: 'hr',
    ingredients: [{name: 'acai', amount: 200, measure: 'g'}],},
  ];
  productListChanges = new Subject<Product[]>();

  constructor(private http: HttpClient) { }

  fetchProducts() {
    this.productListChanges.next(this.productList);
  }

  addProduct(product: Product) {
    this.http.post('https://massas-veneza.firebaseio.com/produtos', product).subscribe(response => {
      console.log(response);
    })
  }
}

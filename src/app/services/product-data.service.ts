import { ProductService } from './product.service';
import { AuthService } from './auth.service';
import { CloudStorageService } from './cloudStorage.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Product } from 'src/app/models/product.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductDataService {

  productList: Product[];
  productListChanges = new Subject<Product[]>();

  private clientID = this.authService.clientID;
  private defaultURL = `https://lacuisine-platform.firebaseio.com/${this.clientID}/produtos`

  constructor(
    private http: HttpClient,
    private cloudStorageService: CloudStorageService,
    private productService: ProductService,
    private authService: AuthService) { }



  fetchProducts() {
    this.http.get<{ [key: string]: Product }>(`${this.defaultURL}.json`)
    .pipe(map(responseData => {
      const productsArray: Product[] = [];
      for (const key in responseData) {
        this.cloudStorageService.downloadImage(responseData[key].imagePath).then(downloadImageUrl => {
          responseData[key].imageUrl = downloadImageUrl;
          productsArray.push({ ...responseData[key], id: key });
        })
      };
      //TODO: SORT ALPHABBETICALLY
      return productsArray.sort((a, b) => a.name.localeCompare(b.name));
    })).subscribe(productsArray => {
        this.productList = productsArray;
        this.productListChanges.next(this.productList);
        setTimeout(() => this.productService.changeProductAtView(this.productList[0]), 500);
    })
  }



  addProduct(product: Product, image: File) {
    if (!this.productList.find(productItem => productItem.name === product.name)) {
      product.imagePath = `${this.clientID}/produtos/${product.name}`;

      this.cloudStorageService.uploadImage(product.imagePath, image);

      this.http.post(`${this.defaultURL}.json`, product).subscribe(() => this.fetchProducts());
      // this.http.post(`${this.defaultURL}.json`, product).subscribe(() => setTimeout(() => this.fetchProducts(), 1000));
    }
  }



  updateProduct(product: Product, changes: {}) {

  }



  deleteMenu(product: Product) {
    this.cloudStorageService.deleteImage(product.imagePath);
    this.http.delete(`${this.defaultURL}/${product.id}.json`).subscribe(() => this.fetchProducts());
  }
}

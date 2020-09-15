import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Product } from '../../../../models/product.model';
import { Ingredient } from './../../../../models/ingredient.mode';
import { ProductService } from '../../../../services/product.service';
import { ProductDataService } from 'src/app/services/product-data.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @ViewChild('openConfirmModal') openConfirmModal: ElementRef;
  @Input('mode') mode: string;

  product: Product;
  productViewChangesSub: Subscription;

  productOnUpdate: Product;
  productOnUpdateChangesSub: Subscription;

  imagePreviewUrl: SafeUrl;
  imageInputFile: File;

  addProductForm: FormGroup;
  addIngredientForm: FormGroup;
  ingredientList: Ingredient[] = [];

  constructor(private productService: ProductService, private _DomSanitizationService: DomSanitizer, private productDataService: ProductDataService) { }

  ngOnInit(): void {
    this.product = this.productService.productOnView;
    this.productViewChangesSub = this.productService.productOnViewChanges.subscribe(newProduct => this.product = newProduct);

    this.productOnUpdate = this.productService.productOnUpdate;
    this.productOnUpdateChangesSub = this.productService.productOnUpdateChanges.subscribe(newProduct => this.productOnUpdate = newProduct);

    //TODO: SORT ALPHABETICALY
    this.ingredientList.push(...this.product.ingredients.sort((a, b) => a.name.localeCompare(b.name)));
    this.buildProductForm(this.mode === 'update' ? false : true);
    this.buildaddIngredientForm();
  }



  buildProductForm(fromScratch?: boolean) {
    this.addProductForm = new FormGroup({
      image: new FormControl(null),
      name: new FormControl(!fromScratch ? this.product.name : null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(20)]}),
      price: new FormControl(!fromScratch ? this.product.price : null, {validators: [Validators.required, Validators.min(0.1)]}),
      productionTime: new FormControl(!fromScratch ? this.product.productionTime : null, {validators: [Validators.required, Validators.minLength(2), Validators.min(1), Validators.max(60)]}),
      productionTimeUnit: new FormControl(!fromScratch ? this.product.productionTimeUnit : 'min', {validators: Validators.required})
    })
  }
  buildaddIngredientForm() {
    this.addIngredientForm = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3), Validators.maxLength(16)]}),
      amount: new FormControl(null, {validators: [Validators.required, Validators.min(1), Validators.max(999)]}),
      measure: new FormControl('g', {validators: Validators.required})
   })
  }



  onAddIngredient() {
    if (this.addIngredientForm.valid && !this.ingredientList.find(ingredient => ingredient.name === this.addIngredientForm.get('name').value)) {
      this.ingredientList.push({
        name: this.addIngredientForm.get('name').value,
        amount: this.addIngredientForm.get('amount').value,
        measure: this.addIngredientForm.get('measure').value
      })
      this.addIngredientForm.reset();
      this.addIngredientForm.get('measure').setValue('g');
    }
  }
  delIngredient(ingredient: Ingredient) {
    this.ingredientList = this.ingredientList.filter(ingredientItem => ingredientItem !== ingredient);
  }



  onSubmit() {
    let newProduct: Product = {
      name: this.addProductForm.get('name').value,
      imagePath: 'added on the service',
      price: this.addProductForm.get('price').value,
      productionTime: this.addProductForm.get('productionTime').value,
      productionTimeUnit: this.addProductForm.get('productionTimeUnit').value,
      ingredients: this.ingredientList,
    }

    this.productDataService.addProduct(newProduct, this.imageInputFile);
  }


  //TODO: UPDATE
  onUpdateProduct() {
    let prodForm = this.addProductForm;
    let imageInput = prodForm.get('image');
    let nameInput = prodForm.get('name');
    let priceInput = prodForm.get('price');
    let prodTimeInput = prodForm.get('productionTime');
    let prodTimeUnitInput = prodForm.get('productionTimeUnit');

    // if (imageInput)
      // this.
  }



  onImagePreview(event: Event) {
    if (event.target['files'].length > 0) {
      let imagePreviewUrl = URL.createObjectURL(event.target['files'][0]);
      this.imagePreviewUrl = this._DomSanitizationService.bypassSecurityTrustUrl(imagePreviewUrl);
      this.imageInputFile = event.target['files'][0];
    }
  }



  onCancelFormChanges(confirm?: boolean) {
    if (this.addProductForm.dirty && confirm) {
      this.openConfirmModal.nativeElement.click();
    }
    else {
      this.productService.changeProductOnUpdate(null);
      this.imagePreviewUrl = null;
      this.ingredientList = null;
      this.addProductForm.reset();
      // this.productService.changeProductAtView(this.productDataService.productList[0]);
    }
  }



  ngOnDestroy() {
    this.onCancelFormChanges();

    this.productViewChangesSub.unsubscribe();
  }
}

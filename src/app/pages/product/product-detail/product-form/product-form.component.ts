import { Component, OnInit, Input, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

import { Product } from '../../../../models/product.model';
import { ProductService } from '../../../../services/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {
  @ViewChild('openConfirmModal') openConfirmModal: ElementRef;
  @Input('mode') mode: string;

  product: Product;
  productChangesSub: Subscription;

  productOnUpdate: Product;
  productOnUpdateChangesSub: Subscription;

  imagePreviewUrl: SafeUrl;
  imageInputFile: File;

  addProductForm: FormGroup;

  constructor(private productService: ProductService, private _DomSanitizationService: DomSanitizer) { }

  ngOnInit(): void {
     this.product = this.productService.productOnView;
     this.productChangesSub = this.productService.productOnViewChanges.subscribe(newProduct => this.product = newProduct);

     this.productOnUpdate = this.productService.productOnUpdate;
     this.productOnUpdateChangesSub = this.productService.productOnUpdateChanges.subscribe(newProduct => this.productOnUpdate = newProduct);

     if (this.mode === 'update') {
      this.addProductForm = new FormGroup({
        image: new FormControl(null),
        name: new FormControl(this.product.name , {validators: [Validators.required, Validators.minLength(3)]}),
        price: new FormControl(this.product.price , {validators: [Validators.required, Validators.minLength(2), Validators.min(1)]}),
        productionTime: new FormControl(this.product.productionTime , {validators: [Validators.required, Validators.minLength(2), Validators.min(1)]}),
        productionTimeUnit: new FormControl(this.product.productionTimeUnit, {validators: [Validators.required, Validators.minLength(2), Validators.min(1)]})
      });
    }
    else {
      this.addProductForm = new FormGroup({
        image: new FormControl(null, {validators: Validators.required}),
        name: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
        price: new FormControl(null, {validators: [Validators.required, Validators.minLength(2), Validators.min(1)]}),
        productionTime: new FormControl(null, {validators: [Validators.required, Validators.minLength(2), Validators.min(1)]}),
        productionTimeUnit: new FormControl('dia', {validators: [Validators.required, Validators.minLength(2), Validators.min(1)]})
      });
    }
  }


  onSubmit() {
    console.log('submited');
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
      this.productService.changeProductUpdate(null);
      this.imagePreviewUrl = null;
      this.addProductForm.reset();
    }
  }




  ngOnDestroy() {
    this.onCancelFormChanges();

    this.productChangesSub.unsubscribe();
  }
}

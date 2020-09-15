import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { environment } from '../environments/environment';
import * as firebase from 'firebase/app';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CorouselComponent } from './pages/index/corousel/corousel.component';
import { IndexComponent } from './pages/index/index.component';
import { FooterComponent } from './components/footer/footer.component';
import { MenuGridComponent } from './pages/menu/menu-grid/menu-grid.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';
import { MenuComponent } from './pages/menu/menu.component';
import { MenuCardComponent } from './pages/menu/menu-grid/menu-card/menu-card.component';
import { BrandComponent } from './components/header/brand/brand.component';
import { MenuCardEditButtonsComponent } from './pages/menu/menu-grid/menu-card/menu-card-edit-buttons/menu-card-edit-buttons.component';
import { ConfirmModalComponent } from './components/modal/confirm-modal/confirm-modal.component';
import { AddMenuFormModalComponent } from './pages/menu/menu-card-add/menu-card-add.component';
import { ProductComponent } from './pages/product/product.component';
import { ProductCardComponent } from './pages/product/product-card-list/product-card/product-card.component';
import { ProductDetailComponent } from './pages/product/product-detail/product-detail.component';
import { ProductFormComponent } from './pages/product/product-detail/product-form/product-form.component'
import { ProductCardListComponent } from './pages/product/product-card-list/product-card-list.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NgxCurrencyModule } from "ngx-currency";
import { ErrorModalComponent } from './components/modal/error-modal/error-modal.component';

firebase.initializeApp(environment.firebase)

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CorouselComponent,
    IndexComponent,
    FooterComponent,
    MenuGridComponent,
    NewOrderComponent,
    MenuComponent,
    MenuCardComponent,
    BrandComponent,
    MenuCardEditButtonsComponent,
    ConfirmModalComponent,
    AddMenuFormModalComponent,
    ProductComponent,
    ProductCardComponent,
    ProductDetailComponent,
    ProductCardListComponent,
    PageNotFoundComponent,
    ProductFormComponent,
    ErrorModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCurrencyModule,
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFireDatabaseModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

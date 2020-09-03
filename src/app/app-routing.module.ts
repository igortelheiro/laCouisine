import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductComponent } from './pages/product/product.component';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IndexComponent } from './pages/index/index.component';
import { MenuComponent } from './pages/menu/menu.component';
import { NewOrderComponent } from './pages/new-order/new-order.component';

const routes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'cardapio', component: MenuComponent, canActivateChild: [AuthGuard]},
  {path: 'cardapio/:produto', component: ProductComponent},
  {path: 'novo-pedido', canActivate: [AuthGuard], component: NewOrderComponent},
  {path: 'notfound', component: PageNotFoundComponent},
  {path: '**', redirectTo: '/notfound'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

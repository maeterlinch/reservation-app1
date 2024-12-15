import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdcutDetailComponent } from './prodcut-detail/prodcut-detail.component';
import { ProdcutListComponent } from './prodcut-listings/prodcut-listings.component';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductService } from './shared/product.service';
import { AuthGuard } from '../auth/shared/auth.guard';

const routes: Routes = [
  { 
//    { path: 'products', component: ProdcutListComponent },
//    { path: 'detail', component: ProdcutDetailComponent }
    path: 'products', component: ProductComponent,
    children: [
      { path: '', component: ProdcutListComponent },
      { path: ':productId', component: ProdcutDetailComponent,canActivate: [AuthGuard] }
    ]
  }
];


@NgModule({
  declarations: [
    ProductComponent,
    ProdcutDetailComponent,
    ProdcutListComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ],
  providers: [
    ProductService
  ],
  bootstrap: []
})
export class ProdcutRoutingModule { }

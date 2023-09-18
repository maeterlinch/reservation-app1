import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdcutRoutingModule } from './product/product-routing.module';

const routes: Routes = [
   { path: '', redirectTo: 'products', pathMatch: 'full' },
  // { path: 'detail', component: ProdcutDetailComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProdcutRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

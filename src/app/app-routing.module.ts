import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdcutRoutingModule } from './product/product-routing.module';
import { AuthRoutingModule } from './auth/auth-routingmodule';

const routes: Routes = [
   { path: '', redirectTo: 'products', pathMatch: 'full' },
   { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    ProdcutRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

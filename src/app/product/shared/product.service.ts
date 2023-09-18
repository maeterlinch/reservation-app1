import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { products } from 'src/app/products';
import { Observable } from 'rxjs';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }

getProducts(): Observable<any> {
return this.http.get('/api/v1/products')
}

getProductById(productId: string): Observable<any> {
  return this.http.get('/api/v1/products/' + productId)
}

}

//getProductById(productId: number){
//  return products[productId]
//}
//  getProducts(): Observable<any> {
//    return this.http.get('/api/v1/products')
//  }


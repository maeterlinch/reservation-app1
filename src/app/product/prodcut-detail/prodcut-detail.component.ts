import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { products } from '../../products';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-prodcut-detail',
  templateUrl: './prodcut-detail.component.html',
  styleUrls: ['./prodcut-detail.component.scss']
})
export class ProdcutDetailComponent implements OnInit {
  //product: { name: string; price: number; description: string; } = { name: '', price: 0, description: '' };
//  products = products;
//  product!: { name: string; price: number; description: string; }; 
product: any;

  // ActivatedRouteサービスをDIします
  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
    ) { }
  
  ngOnInit(): void {
    this.route.paramMap.subscribe(_params => {
//      this.product = products[+_params.get('productId')!]
//    this.product = this.productService.getProductById(_params.get('productId')!)
      const productsObservable = this.productService.getProductById(_params.get('productId')!)
      productsObservable.subscribe(
        (data) => { 
          this.product = data
          console.log('次のデータが出力されました： ' + data)
        },
        (err) => { console.error('次のエラーが発生しました: ' + err) 
      }
      )
    })
  }

}
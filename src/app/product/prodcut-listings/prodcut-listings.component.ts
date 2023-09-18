import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
//import { products } from '../../products';
import { ProductService } from '../shared/product.service';

@Component({
  selector: 'app-prodcut-listings',
  templateUrl: './prodcut-listings.component.html',
  styleUrls: ['./prodcut-listings.component.scss']
})
export class ProdcutListComponent implements OnInit{
//  products = this.productService.getProducts()
products: any[] = []

constructor(private productService: ProductService) { }
//  private route: ActivatedRoute
  
  ngOnInit(): void {

    const productsObservable = this.productService.getProducts()
    productsObservable.subscribe(
      (data) => { 
        this.products = data
        console.log('次のデータが出力されました： ' + data)
      },
      (err) => { console.error('次のエラーが発生しました: ' + err) } 
    )

  }
}
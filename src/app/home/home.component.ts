import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  products: Product[] = [];

  // comes from products.component.ts to home.component.html then to here
  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts('http://localhost:3000/clothes', {page, perPage }).subscribe((products : Products) => {
      console.log(products.items)
      this.products = products.items;
      this.totalRecords = products.total; // total amound of products base on what backend gives us
    });
  }


  // this is called when our component is initiallized
  // we invoke the getProducts from the products services and we subscribe to the output it produces
  // once this result of the observable comes, 
  // ngOnInit() {
  //   this.productsService.getProducts('http://localhost:3000/clothes', {page: 0, perPage: 5}).subscribe((products : Products) => {
  //     // console.log(products.items)
  //     this.products = products.items;
  //   });
  // }

  ngOnInit() {
    this.fetchProducts(0,this.rows); 
  }

  onPageChange(event: any) {
    this.fetchProducts(event.page, event.rows)
  }

  totalRecords: number = 0;
  rows : number = 5

}

import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  products: Product[] = [];

  // this is called when our component is initiallized
  // we invoke the getProducts from the products services and we subscribe to the output it produces
  // once this result of the observable comes, 
  ngOnInit() {
    this.productsService.getProducts('http://localhost:3000/clothes', {page: 0, perPage: 5}).subscribe((products : Products) => {
      // console.log(products.items)
      this.products = products.items;
    });
  }
}

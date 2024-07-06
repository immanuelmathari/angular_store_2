import { Component } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Products } from '../../types';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  // this is called when our component is initiallized
  // we invoke the getProducts from the products services and we subscribe to the output it produces
  // once this result of the observable comes, 
  ngOnInit() {
    this.productsService.getProducts('http://localhost:3000/clothes', {page: 0, perPage: 5}).subscribe((products : Products) => {
      console.log(products.items)
    })
  }
}

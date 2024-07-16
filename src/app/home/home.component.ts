import { Component, ViewChild } from '@angular/core';
import { ProductsService } from '../services/products.service';
import { Product, Products } from '../../types';
import { ProductComponent } from '../components/product/product.component';
import { CommonModule } from '@angular/common';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, CommonModule, PaginatorModule, EditPopupComponent, ButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private productsService: ProductsService
  ) { }

  @ViewChild('paginator') paginator: Paginator | undefined;

  products: Product[] = [];

  // comes from products.component.ts to home.component.html then to here
  onProductOutput(product: Product) {
    console.log(product, 'Output');
  }

  resetPaginator() {
    this.paginator?.changePage(0);
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

  // to add products
  editProduct(product: Product, id: number) {
    // console.log(product, 'Edit');
    this.productsService.editProduct(`http://localhost:3000/clothes/${id}`, product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error)
        },
      }
    )

  }

  deleteProduct(id: number) {
    // console.log(product, 'Delete')
    this.productsService.deleteProduct(`http://localhost:3000/clothes/${id}`).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();
        },
        error: (error) => {
          console.log(error)
        },
      }
    )
  }

  addProduct(product: Product) {
    // console.log(product, 'Add')
    this.productsService.addProduct('http://localhost:3000/clothes', product).subscribe(
      {
        next: (data) => {
          console.log(data);
          this.fetchProducts(0, this.rows);
          this.resetPaginator();

        },
        error: (error) => {
          console.log(error);
        }
      }
    )
  }

  displayEditPopup: boolean = false;
  displayAddPopup: boolean = false;

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleDeletePopup(product: Product) {
    if (!product.id)
    {return;}
    this.deleteProduct(product.id);

  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  selectedProduct: Product = {
    id: 0,
    name: '',
    image: '',
    price: '',
    rating: 0,
  }

  onConfirmEdit(product: Product) {
    this.editProduct(product, this.selectedProduct.id ?? 0); // check if exists else 0
    this.displayEditPopup = false;
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

}

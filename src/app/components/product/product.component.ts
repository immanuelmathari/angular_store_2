import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule, FormsModule
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  @Input() product!: Product; // the ! it says that it cannot be null.
  @Output() productOutput: EventEmitter<Product> = new EventEmitter<Product>(); // we initialize the event emitter

  ngOnInit() {
    this.productOutput.emit(this.product);
  }
 }

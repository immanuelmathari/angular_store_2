import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Product } from '../../../types';
import { RatingModule } from 'primeng/rating';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { ToastModule } from 'primeng/toast';
import { PricePipe } from '../../pipes/price.pipe';
import { TruncateNamePipe } from '../../pipes/truncate-name.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    RatingModule, FormsModule, ButtonModule,  ConfirmPopupModule, ToastModule, PricePipe, TruncateNamePipe
  ],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {
  constructor(private confirmationService: ConfirmationService) {}
  @ViewChild('deleteButton') deleteButton: any;
  @Input() product!: Product; // the ! it says that it cannot be null.
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>(); // we initialize the event emitter
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      target: this.deleteButton.nativeElement,
      message: "Are you sure you want  to delete",
      accept: () => {
        this.deleteProduct();
      },
    })
  }

  deleteProduct() {
    this.delete.emit(this.product);
  }

  ngOnInit() {
  }
 }

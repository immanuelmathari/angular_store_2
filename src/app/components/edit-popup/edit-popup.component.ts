import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';


@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display: boolean = false;
  @Output() confirm = new EventEmitter<any>();
  @Input() header!: string; // this input will always be provided

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  onConfirm() {
    this.confirm.emit(this.product);
  }

  onCancel() {
    this.display = false; // closes popup
  }
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output,  } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { Product } from '../../../types';
import { FormBuilder, FormsModule, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';



@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, CommonModule, FormsModule, RatingModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  // adding a form group
  constructor(private formBuilder: FormBuilder) {};
  @Input() display: boolean = false;
  @Output() displayChange = new EventEmitter<boolean>();
  @Output() confirm = new EventEmitter<Product>();
  @Input() header!: string; // this input will always be provided

  @Input() product: Product = {
    name: '',
    image: '',
    price: '',
    rating: 0,
  };

  // custom validator. or a control.
  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacter = /[!@#$%^&*()_+\[\]{};':"\\|,.<>\/?]+/.test(
        control.value
      );
      return hasSpecialCharacter ? {hasSpecialCharacter: true} : null;
      // null means the validator has found no issue
    }
  }

  productForm = this.formBuilder.group({ 
    name: ['', [Validators.required, this.specialCharacterValidator()]],
    image: [''],
    price: ['', [Validators.required]],
    rating: [0,],
});

// we want to use this productForm from our input
ngOnChanges() {
  this.productForm.patchValue(this.product); // had they not been the same wed beed to do like this
  // this.productForm.patchValue({
  //   name: this.product.name,
  //   image: this.product.image,
  //   price: this.product.price,
  //   rating: this.product.rating,
  // })
}

  onConfirm() {
    // this.confirm.emit(this.product);
    // this.confirm.emit(this.productForm.value); // we are expecting null values
    // this.confirm.emit({
    //   name: this.productForm.value.name || '',
    //   image: this.productForm.value.image || '',
    //   price: this.productForm.value.price || '',
    //   rating: this.productForm.value.rating || 0,
    // })
    const { name, image, price, rating} = this.productForm.value;
    this.confirm.emit({
      name: name  || '',
      image: image || '',
      price: price || '',
      rating: rating || 0,
    })
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false; // closes popup
    this.displayChange.emit(this.display);
  }
}

import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService } from '../infraestructure/product.service';
import { FormsModule } from '@angular/forms';
import { Product } from '../domain/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../infraestructure/product-form.component.html',
  styleUrls: ['../infraestructure/product-form.component.css'],
})
export class ProductFormComponent {
  @Input() product: Product = { Id: 0, Name: '', Price: 0 };
  @Output() formSubmit = new EventEmitter<void>();
  @Output() cancelEvent = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  saveProduct(): void {
    if (this.product.Id) {
      this.productService
        .update(this.product)
        .subscribe(() => this.formSubmit.emit());
    } else {
      this.productService
        .create(this.product)
        .subscribe(() => this.formSubmit.emit());
    }
  }

  cancel(): void {
    this.cancelEvent.emit(); //
  }
}

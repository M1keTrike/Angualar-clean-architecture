import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductService, Product } from './product.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  @Input() product: Product = { id: 0, name: '', price: 0 };
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private productService: ProductService) {}

  saveProduct(): void {
    if (this.product.id) {
      this.productService.update(this.product).subscribe(() => this.formSubmit.emit());
    } else {
      this.productService.create(this.product).subscribe(() => this.formSubmit.emit());
    }
  }
}

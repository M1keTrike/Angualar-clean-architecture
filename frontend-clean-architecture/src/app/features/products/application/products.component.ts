import { Component, OnInit } from '@angular/core';
import { ProductService } from '../infraestructure/product.service';
import { Product } from '../domain/product.model';
import { ProductResponse } from '../domain/productsrResponse.model';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from './product-form.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: '../infraestructure/products.component.html',
  styleUrls: ['../infraestructure/products.component.css'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  showForm = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll().subscribe(
      (response: ProductResponse) => {
        console.log('Respuesta de la API:', response);

        if (response && response.Products) {
          this.products = response.Products;
        } else {
          console.error('La API no devolvió un array:', response);
          this.products = [];
        }
        console.log(this.products);
      },
      (error) => {
        console.error('Error al cargar productos:', error);
        this.products = [];
      }
    );
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => {
      this.loadProducts();
    });
  }
}

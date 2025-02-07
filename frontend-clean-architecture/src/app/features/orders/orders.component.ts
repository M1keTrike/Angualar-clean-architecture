import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
import { OrderResponse } from './orderResponse.model';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './order-form.component';
import { Order } from './order.model';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule, OrderFormComponent],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  showForm = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(
      (response: OrderResponse) => {
        console.log('Respuesta de la API:', response);

        if (response && response.Orders) {
          this.orders = response.Orders;
        } else {
          console.error('La API no devolvió un array:', response);
          this.orders = [];
        }
      },
      (error) => {
        console.error('Error al cargar órdenes:', error);
        this.orders = [];
      }
    );
  }

  deleteOrder(id: number): void {
    this.orderService.delete(id).subscribe(() => {
      this.loadOrders();
    });
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
  }
}

import { Component, OnInit } from '@angular/core';
import { OrderService, Order } from './order.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  showForm = false;

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.orderService.getAll().subscribe(data => this.orders = data);
  }

  deleteOrder(id: number): void {
    if (confirm('¿Estás seguro de eliminar esta orden?')) {
      this.orderService.delete(id).subscribe(() => this.loadOrders());
    }
  }
}

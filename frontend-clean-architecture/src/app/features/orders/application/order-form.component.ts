import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderService } from '../infraestructure/order.service';
import { FormsModule } from '@angular/forms';
import { Order } from '../domain/order.model';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../infraestructure/order-form.component.html',
  styleUrls: ['../infraestructure/order-form.component.css'],
})
export class OrderFormComponent {
  @Input() order: Order = { Id: 0, Actor: 0, Product: 0, Quantity: 1 };
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private orderService: OrderService) {}

  saveOrder(): void {
    if (this.order.Id) {
      this.orderService
        .update(this.order)
        .subscribe(() => this.formSubmit.emit());
    } else {
      this.orderService
        .create(this.order)
        .subscribe(() => this.formSubmit.emit());
    }
  }
}

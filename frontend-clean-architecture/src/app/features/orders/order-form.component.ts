import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OrderService, Order } from './order.service';

@Component({
  selector: 'app-order-form',
  standalone: true,
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent {
  @Input() order: Order = { id: 0, actor: 0, product: 0, quantity: 1 };
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private orderService: OrderService) {}

  saveOrder(): void {
    if (this.order.id) {
      this.orderService.update(this.order).subscribe(() => this.formSubmit.emit());
    } else {
      this.orderService.create(this.order).subscribe(() => this.formSubmit.emit());
    }
  }
}

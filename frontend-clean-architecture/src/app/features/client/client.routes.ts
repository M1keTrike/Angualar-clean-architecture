import { Routes } from '@angular/router';
import { ClientGuard } from '../auth/guards/client.guard';
import { ClientLayoutComponent } from './client-layout/client-layout.component';
import { OrdersComponent } from '../orders/application/orders.component';
import { ProductsViewComponent } from './products-view/products-view.component';

export const clientRoutes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    canActivate: [ClientGuard],
    children: [
      { path: 'orders', component: OrdersComponent },
      { path: 'products', component: ProductsViewComponent },
    ],
  },
];

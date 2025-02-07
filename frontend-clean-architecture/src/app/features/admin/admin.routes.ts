import { Routes } from '@angular/router';
import { AdminGuard } from '../auth/guards/admin.guard';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { ProductsComponent } from '../products/application/products.component';
import { UsersComponent } from '../users/application/users.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      { path: 'products', component: ProductsComponent },
      { path: 'users', component: UsersComponent },
    ],
  },
];

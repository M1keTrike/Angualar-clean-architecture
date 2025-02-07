import { Routes } from '@angular/router';


export const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  { 
    path: 'auth', 
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.authRoutes) 
  },
  { 
    path: 'admin', 
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.adminRoutes) 
  },
  { 
    path: 'client', 
    loadChildren: () => import('./features/client/client.routes').then(m => m.clientRoutes) 
  },
  { path: '**', redirectTo: 'auth/login' } 
];

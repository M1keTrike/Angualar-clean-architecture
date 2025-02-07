import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private router: Router, private toastr: ToastrService) {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.userRoleSubject.next(savedRole);
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      this.userRoleSubject.next('admin');
      this.toastr.success('Bienvenido, Admin', 'Inicio de Sesión Exitoso');
      this.router.navigate(['/admin']);
      return true;
    } else if (username === 'cliente' && password === 'cliente123') {
      localStorage.setItem('userRole', 'client');
      this.userRoleSubject.next('client');
      this.toastr.success('Bienvenido, Cliente', 'Inicio de Sesión Exitoso');
      this.router.navigate(['/client']);
      return true;
    }
    this.toastr.error('Usuario o contraseña incorrectos', 'Error de Autenticación');
    return false;
  }

  logout(): void {
    localStorage.removeItem('userRole');
    this.userRoleSubject.next(null);
    this.toastr.info('Has cerrado sesión', 'Sesión Finalizada');
    this.router.navigate(['/auth/login']);
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userRole');
  }
  
}

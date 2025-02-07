import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userRoleSubject = new BehaviorSubject<string | null>(null);

  constructor(private router: Router) {
    const savedRole = localStorage.getItem('userRole');
    if (savedRole) {
      this.userRoleSubject.next(savedRole);
    }
  }

  login(username: string, password: string): boolean {
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('userRole', 'admin');
      this.userRoleSubject.next('admin');
      this.router.navigate(['/admin']);
      return true;
    } else if (username === 'cliente' && password === 'cliente123') {
      localStorage.setItem('userRole', 'client');
      this.userRoleSubject.next('client');
      this.router.navigate(['/client']);
      return true;
    }
    return false;
  }

  logout(): void {
    localStorage.removeItem('userRole');
    this.userRoleSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getUserRole(): Observable<string | null> {
    return this.userRoleSubject.asObservable();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('userRole');
  }

  getRole(): string | null {
    return localStorage.getItem('userRole');
  }
}

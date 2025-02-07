import { Component, OnInit } from '@angular/core';
import { UserService } from '../infraestructure/user.service';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from './user-form.component';
import { User } from '../domain/user.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserFormComponent],
  templateUrl: '../infraestructure/users.component.html',
  styleUrls: ['../infraestructure/users.component.css'],
})
export class UsersComponent implements OnInit {
  users: User[] = [];
  showForm = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getAll().subscribe((data) => (this.users = data));
  }

  deleteUser(id: number): void {
    if (confirm('¿Estás seguro de eliminar este usuario?')) {
      this.userService.delete(id).subscribe(() => this.loadUsers());
    }
  }
}

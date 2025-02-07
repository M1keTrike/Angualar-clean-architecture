import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService, User } from './user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent {
  @Input() user: User = { id: 0, username: '', role: 'client' };
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  saveUser(): void {
    if (this.user.id) {
      this.userService.create(this.user).subscribe(() => this.formSubmit.emit());
    } else {
      this.userService.create(this.user).subscribe(() => this.formSubmit.emit());
    }
  }
}

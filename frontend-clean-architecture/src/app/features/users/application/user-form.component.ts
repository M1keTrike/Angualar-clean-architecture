import { Component, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../infraestructure/user.service';
import { FormsModule } from '@angular/forms';
import { User } from '../domain/user.model';


@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: '../infraestructure/user-form.component.html',
  styleUrls: ['../infraestructure/user-form.component.css'],
})
export class UserFormComponent {
  @Input() user: User = { Id: 0, Username: '', Role: 2 , Password: ''};
  @Output() formSubmit = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  saveUser(): void {
    if (this.user.Id) {
      this.userService
        .create(this.user)
        .subscribe(() => this.formSubmit.emit());
    } else {
      this.userService
        .create(this.user)
        .subscribe(() => this.formSubmit.emit());
    }
  }
}
 
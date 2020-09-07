import { Component } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {
  users = [];
  loading = false;
  error = false;

  constructor(private usersService: UsersService) {}

  fetchUsers() {
    this.loading = true;

    this.usersService.get().subscribe({
      next: users => {
        this.users = users;
        this.error = false;
        this.loading = false;
      },
      error: () => {
        this.error = true;
        this.loading = false;
      }
    });
  }
}

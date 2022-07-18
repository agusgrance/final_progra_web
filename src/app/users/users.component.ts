import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { ApiService } from '../api.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Users[] = [{
    Id: 1, name: 'Pablo', pwd: 'sadas', email: 'asdasd@sadas.com', rol: 'Admin'
  }]

  constructor(private dataService: ApiService) { }
  listarUsers() {
    this.dataService.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (e) => { }
      });
  }


  ngOnInit(): void {
    this.listarUsers();
  }

}

import { Component, OnInit } from '@angular/core';
import { Users } from '../users';
import { ApiService } from '../api.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Users[] = [{
    id: 1, name: 'Pablo', pwd: 'sadas', email: 'asdasd@sadas.com', rol: 'Admin'
  }]

  isModalActive = false;
  editUser = 0;
  roles: any;
  rolId: any;
  angForm: any;
  constructor(private fb: FormBuilder, private dataService: ApiService, private router: Router) {

    this.angForm = this.fb.group({
      user: ['', Validators.required],
      email: ['', [Validators.required, Validators.minLength(1), Validators.email]],
      rol: ['', Validators.required],

    });
  }


  patchData(angForm1: any, idUser: number) {

    let rol = angForm1.value.rol != '' ? angForm1.value.rol : 1;
    let idRol = this.roles.find((r: any) => r.rol == rol)?.id;
    this.dataService.updateUser(idUser, angForm1.value.user, angForm1.value.email, idRol)
      .subscribe(() => {
        this.listarUsers();
      });
  }
  listarUsers() {
    this.dataService.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (e) => { }
      });
  }
  delete(id: any) {

    this.dataService.deleteUser(id)
      .subscribe(() => {
        this.listarUsers();
      });

  }
  showModal(id: number) {
    this.editUser = id;
    this.isModalActive = true;
  }
  listarRoles() {
    this.dataService.getRoles()
      .subscribe({
        next: (response) => {
          this.roles = response;
        },
        error: (e) => { }
      });
  }

  hideModal() {
    this.isModalActive = false;
  }
  isCurrentUser(id: any) {
    if (this.users.find((r: any) => this.dataService.getToken() == id)) {
      return true;
    }
    return false;
  }

  ngOnInit(): void {
    this.listarUsers();
    this.listarRoles();
  }

}

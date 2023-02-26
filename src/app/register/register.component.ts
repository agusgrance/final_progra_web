import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { findIndex, first, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Users } from '../users';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  angForm: FormGroup;
  users: Users[] = []
  constructor(
    private fb: FormBuilder,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', Validators.required],
      name: ['', Validators.required],
      admin: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.dataService.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response;
        },
        error: (e) => { }
      });
  }
  postdata(angForm1: any) {
    const isAdmin = angForm1.value.admin ? 1 : 2;
    const isCreated: any = this.users.find((user: Users) => user.name == angForm1.value.name || user.email == angForm1.value.email)
    if (!isCreated) {
      this.dataService
        .userregistration(
          angForm1.value.name,
          angForm1.value.email,
          angForm1.value.password,
          isAdmin
        )
        .pipe(first())
        .subscribe(
          (data) => {
            this.router.navigate(['login']);
          },

          (error) => { }
        );
    } else {
      alert(
        'Sorry... this user/email already exists, please try with another one'
      );
    }
  }

  get email() {
    return this.angForm.get('email');
  }
  get password() {
    return this.angForm.get('password');
  }
  get name() {
    return this.angForm.get('name');
  }
  get admin() {
    return this.angForm.get('admin');
  }
}

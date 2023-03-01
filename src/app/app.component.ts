import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  loginbtn: boolean;
  logoutbtn: boolean;
  isAdmin: any;
  myToken: any;

  constructor(private dataService: ApiService) {
    dataService.getLoggedInName.subscribe(name => this.changeName(name));
    dataService.getLoggedInAdmin.subscribe(admin => this.getAdmin(admin));



    if (this.dataService.isLoggedIn()) {

      this.loginbtn = false;
      this.logoutbtn = true

    }
    else {
      this.loginbtn = true;
      this.logoutbtn = false;
      this.isAdmin = false;
    }

  }
  ngOnInit(): void {
    this.myToken = this.dataService.getToken();
  }
  private getAdmin(admin: any) {

    if (admin) {

      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }
  private changeName(name: boolean): void {
    this.logoutbtn = name;
    this.loginbtn = !name;
  }
  logout() {
    this.dataService.deleteToken();
    window.location.href = '';
  }

}
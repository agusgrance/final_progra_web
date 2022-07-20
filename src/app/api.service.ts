import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';;
import { HttpClient } from '@angular/common/http';
import { Users } from './users';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string = '';
  baseUrl: string = "http://localhost/final_progra_web/php";
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  constructor(private httpClient: HttpClient) { }
  public userlogin(username: string, password: string) {
    alert(username)
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(map(Users => {
        this.setToken(Users[0].id);
        this.setRol(Users[0].rol);
        this.getLoggedInName.emit(true);
        return Users;
      }));
  }
  public getUsers() {
    return this.httpClient.get<any>(this.baseUrl + '/selectUsers.php')
      .pipe(map((Users) => {
        return Users;
      }));
  }
  public getCards() {
    return this.httpClient.get<any>(this.baseUrl + '/selectMemes.php')
      .pipe(map((Memes) => {
        return Memes;
      }));
  }
  public getRoles() {
    return this.httpClient.get<any>(this.baseUrl + '/selectRoles.php')
      .pipe(map((roles) => {
        return roles;
      }));
  }

  public userregistration(name: string, email: string, pwd: string) {
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { name, email, pwd })
      .pipe(map(Users => {
        return Users;
      }));
  }
  public memeUpload(comment: string, img: any, date: Date) {
    const user = this.getToken();
    let imgPath = `../../assets/uploads/${img}`;
    return this.httpClient.post<any>(this.baseUrl + '/memeUpload.php', { user, comment, imgPath, date })
      .pipe(map(Meme => {
        return Meme;
      }));

  }
  public deleteUser(id: number) {
    return this.httpClient.post<any>(this.baseUrl + '/deleteUser.php', { id })
      .pipe(map(User => {
        return User;
      }));
  }
  public deleteMeme(id: number) {
    return this.httpClient.post<any>(this.baseUrl + '/deleteMeme.php', { id })
      .pipe(map(Meme => {
        return Meme;
      }));
  }

  public updateUser(id: number, name: string, email: string, rol: number = 0) {
    return this.httpClient.put(`${this.baseUrl}/updateUser.php`, { id, name, email, rol });
  }
  public updateCard(id: number, comment: any) {
    console.log('services', id, comment)
    return this.httpClient.put(`${this.baseUrl}/updateCard.php`, { id, comment });
  }


  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRol(token: string) {
    localStorage.setItem('rol', token);
  }
  getToken() {
    return localStorage.getItem('token');
  }
  getRol() {
    return localStorage.getItem('rol');
  }
  deleteToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol');
  }

  isLoggedIn() {
    const usertoken = this.getToken();
    if (usertoken != null) {
      return true
    }
    return false;
  }
}
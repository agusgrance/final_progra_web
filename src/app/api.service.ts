import { Injectable, Output, EventEmitter } from '@angular/core';
import { map } from 'rxjs/operators';;
import { HttpClient } from '@angular/common/http';
import { Users } from './users';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  redirectUrl: string = '';
  baseUrl: string = "http://localhost/final_progra_web/php";
  userRol: any;
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedInAdmin: EventEmitter<any> = new EventEmitter();


  constructor(private httpClient: HttpClient) { }
  public userlogin(username: string, password: string) {
    alert(username)
    return this.httpClient.post<any>(this.baseUrl + '/login.php', { username, password })
      .pipe(map(Users => {
        this.setToken(Users[0].id);
        this.setRol(Users[0].rol);
        this.userRol = Users[0].rol;
        this.getLoggedInName.emit(true);
        if (Users[0].rol == 1) {
          this.getLoggedInAdmin.emit(true);
        }
        else {
          this.getLoggedInAdmin.emit(false);
        }

        return Users;
      }));
  }
  public getBooks() {

    return this.httpClient.get<any>(`https://api.nytimes.com/svc/books/v3/lists/full-overview.json?api-key=${environment.nyctimes_api_key}`).pipe(map((books) => {
      return books;
    }));
  }
  public getBooksByList(list: string) {

    return this.httpClient.get<any>(`https://api.nytimes.com/svc/books/v3/lists.json?list=${list}&api-key=${environment.nyctimes_api_key}`).pipe(map((books) => {
      return books;
    }));
  }
  public getBooksByISBN(isbn: string) {

    return this.httpClient.get<any>(`https://www.googleapis.com/books/v1/volumes?q=isbn:${isbn}`).pipe(map((books) => {
      return books;
    }));
  }
  public getReviewsByISBN(isbn: string) {

    return this.httpClient.get<any>(`https://api.nytimes.com/svc/books/v3/reviews.json?isbn=${isbn}&api-key=${environment.nyctimes_api_key}`).pipe(map((reviews) => {
      return reviews;
    }));
  }
  public getBestsellers() {

    return this.httpClient.get<any>(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${environment.nyctimes_api_key}`).pipe(map((books) => {
      return books;
    }));
  }
  public getUsers() {
    return this.httpClient.get<any>(this.baseUrl + '/selectUsers.php')
      .pipe(map((Users) => {
        return Users;
      }));
  }
  public getCards() {
    return this.httpClient.get<any>(this.baseUrl + '/selectPosteos.php')
      .pipe(map((posteos) => {
        return posteos;
      }));
  }
  public getCardsParams(id: number) {
    return this.httpClient.put<any>(this.baseUrl + '/selectPosteosParams.php', { id })
      .pipe(map((posteos) => {
        return posteos;
      }));
  }
  public getSinglePostComments(id: number) {
    return this.httpClient.put<any>(this.baseUrl + '/selectSinglePost.php', { id })
      .pipe(map((posteo) => {
        return posteo;
      }));
  }
  public getChat(sender: number, receiver: number) {
    return this.httpClient.put<any>(this.baseUrl + '/selectChat.php', { sender, receiver })
      .pipe(map((posteos) => {
        return posteos;
      }));
  }

  public getRoles() {
    return this.httpClient.get<any>(this.baseUrl + '/selectRoles.php')
      .pipe(map((roles) => {
        return roles;
      }));
  }
  public getProfile(id: number) {
    return this.httpClient.put<any>(this.baseUrl + '/selectProfile.php', { id })
      .pipe(map((profile) => {
        return profile;
      }));
  }
  public getLikes() {
    return this.httpClient.get<any>(this.baseUrl + '/selectLikes.php')
      .pipe(map((roles) => {
        return roles;
      }));
  }
  public getComentarios() {
    return this.httpClient.get<any>(this.baseUrl + '/selectComentarios.php')
      .pipe(map((comment) => {
        return comment;
      }));
  }

  public userregistration(name: string, email: string, pwd: string, admin: number) {
    const img = "https://avatars.dicebear.com/api/initials/" + name.substring(0, 2) + ".svg";
    return this.httpClient.post<any>(this.baseUrl + '/register.php', { name, email, pwd, admin, img })
      .pipe(map(Users => {
        return Users;
      }));
  }
  public addLike(posteo: string) {
    const user = this.getToken();
    return this.httpClient.post<any>(this.baseUrl + '/likes.php', { user, posteo })
      .pipe(map(Users => {
        return Users;
      }));
  }
  public addComentario(posteo: string, texto: string) {
    const user = this.getToken();
    return this.httpClient.post<any>(this.baseUrl + '/comentarios.php', { posteo, user, texto })
      .pipe(map(Users => {
        return Users;
      }));
  }
  public addMessage(sender: number, receiver: number, message: string) {
    console.log(sender, receiver, message)
    return this.httpClient.post<any>(this.baseUrl + '/chat.php', { sender, receiver, message })
      .pipe(map(chat => {
        return chat;
      }));
  }
  public removeLike(id: number) {

    return this.httpClient.post<any>(this.baseUrl + '/removeLike.php', { id })
      .pipe(map(like => {
        return like;
      }));
  }
  public removeComentario(id: number) {

    return this.httpClient.post<any>(this.baseUrl + '/deleteComentario.php', { id })
      .pipe(map(comment => {
        return comment;
      }));
  }

  public memeUpload(comment: string, img: any, date: Date, isbn: string, rating: number) {
    const user = this.getToken();

    let imgPath = `../../assets/uploads/${img}`;
    return this.httpClient.post<any>(this.baseUrl + '/memeUpload.php', { user, comment, imgPath, date, isbn, rating })
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

  public updateUser(id: number, name: string, email: string, rol: number = 1) {
    return this.httpClient.put(`${this.baseUrl}/updateUser.php`, { id, name, email, rol });
  }
  public updateCard(id: number, comment: any) {
    return this.httpClient.put(`${this.baseUrl}/updateCard.php`, { id, comment });
  }


  //token
  setToken(token: string) {
    localStorage.setItem('token', token);
  }
  setRol(token: string) {
    localStorage.setItem('rol', token);
  }
  public getToken() {
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
import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HttpResponse, HttpClient } from '@angular/common/http';
import { ApiService } from '../api.service';
import { first } from 'rxjs/operators';
import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  selectedFiles: any;
  currentFile: any;
  cards: any;
  roles: any;
  msg: any = 'Subir Imagen';
  angForm: FormGroup;
  isAdmin: boolean;
  isModalActive = false;
  isComentModalActive = false;
  editCard = 0;
  postId = 0;
  likes = [];
  comentarios: any = [];
  userId: any;
  defaultValue: string = '';
  books: any = [];
  list_name: any = null;
  booksList: any = []

  constructor(private DashboardService: DashboardService, private fb: FormBuilder, private dataService: ApiService, private router: Router, private http: HttpClient) {
    this.angForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      isbn: ['', Validators.required],

    });
    let rol = Number(this.dataService.getRol());
    if (rol == 1) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  getBooks() {
    this.dataService.getBooks()
      .subscribe({
        next: (response) => {
          this.books = response.results.lists;
        },
        error: (e) => { }
      });
  }
  onChangeCategory(e: any) {
    this.list_name = e.target.value
    this.dataService.getBooksByList(this.list_name)
      .subscribe({
        next: (response) => {
          this.booksList = response.results
        },
        error: (e) => { }
      });

  }

  upload(angForm1: any) {

    this.currentFile = this.selectedFiles.item(0);

    let memeDate = new Date();


    this.DashboardService.uploadFile(this.currentFile).subscribe(response => {
      this.selectedFiles.value = '';

      if (response instanceof HttpResponse) {
        this.msg = '¡Se ha subido con exito!';
        console.log(response.body);
      }


    });
    this.dataService.memeUpload(angForm1.value.comment, this.currentFile.name, memeDate, angForm1.value.isbn, angForm1.value.rating)
      .pipe(first())
      .subscribe(() => {
        this.listarCards();
      });


  }
  listarCards() {
    this.dataService.getCards()
      .subscribe({
        next: (response) => {
          this.cards = response;
        },
        error: (e) => { }
      });
  }
  listarLikes() {
    this.dataService.getLikes()
      .subscribe({
        next: (response) => {
          this.likes = response;
        },
        error: (e) => { }
      });
  }
  listarComentarios() {
    this.dataService.getComentarios()
      .subscribe({
        next: (response) => {
          this.comentarios = response;
        },
        error: (e) => { }
      });
  }
  getPostComments(postId: string) {

    return this.comentarios.filter((comentario: any) => comentario?.posteo_id == postId)
  }
  patchData(angForm1: any, idCard: number) {
    this.dataService.updateCard(idCard, angForm1.value.comment)
      .subscribe(() => {
        this.isModalActive = false;
        this.listarCards();

      });
  }

  patchCommentData(posteoId: string, texto: any) {
    this.dataService.addComentario(posteoId, texto.value.comment)
      .subscribe(() => {
        this.listarComentarios()
        this.defaultValue = '';
      });
  }
  showModal(id: number) {
    this.editCard = id;
    this.isModalActive = true;
  }
  hideModal() {
    this.isModalActive = false;
  }
  showCommentModal(id: number) {
    this.postId = id;
    this.isComentModalActive = true;
  }
  hideCommentModal() {
    this.isComentModalActive = false;
  }
  delete(id: any) {
    this.dataService.deleteMeme(id)
      .subscribe(() => {
        this.listarCards();
      });
  }
  addLike(postId: any) {
    this.dataService.addLike(postId)
      .subscribe(() => {
        this.listarCards();
        this.listarLikes();
      });
  }
  removeLike(postId: any) {

    const like: any = this.likes.find((like: any) => like?.posteo_id == postId && like?.user_id == this.userId)
    this.dataService.removeLike(like.id)
      .subscribe(() => {
        this.listarCards();
        this.listarLikes();
      });
  }
  removeComentario(comentarioId: any) {
    this.dataService.removeComentario(comentarioId)
      .subscribe(() => {
        this.listarComentarios();
      });
  }
  isSubmit(angForm: any, selectedFiles: any) {


    return angForm.value.comment && angForm.value.isbn && angForm.value.rating && selectedFiles
  }

  hasLike(postId: any) {
    return this.likes.find((like: any) => like?.posteo_id == postId && like?.user_id == this.userId)
  }
  likesLength(postId: any) {
    const likes = this.likes.filter((like: any) => like?.posteo_id == postId)
    return likes.length
  }
  comentariosLength(postId: any) {
    const comentarios = this.comentarios.filter((comentario: any) => comentario?.posteo_id == postId)
    return comentarios.length
  }

  ngOnInit(): void {
    this.listarCards();
    this.listarLikes();
    this.listarComentarios();
    this.getBooks()
    this.userId = this.dataService.getToken();
  }
}

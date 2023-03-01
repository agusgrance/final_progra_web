import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  angForm: FormGroup;
  isbn: any;
  book: any;
  reviews: any;
  rating;
  nyrating: any = 0;
  cards: any = [];
  userId: any;
  myComment: any
  postId = 0;
  likes = [];
  comentarios: any = [];
  defaultValue: string = '';
  isComentModalActive = false;
  isAdmin: boolean;
  isModalActive = false;
  editCard = 0;
  shareOptions = false;
  shareCard: any;
  users: any

  public form: FormGroup;
  public formRating: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private dataService: ApiService,
    private router: Router
  ) {
    this.angForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      isbn: ['', Validators.required],

    });
    this.rating = 0;
    this.form = this.fb.group({
      rating: ['', Validators.required],
    });
    this.formRating = this.fb.group({
      publicrating: ['', Validators.required],
    });
    let rol = Number(this.dataService.getRol());
    if (rol == 1) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }
  getBookDetail() {
    this.dataService.getBooksByISBN(this.isbn).subscribe({
      next: (response) => {
        console.log(response.items[0]);
        this.book = response.items[0];
        this.formRating.setValue({
          publicrating: response.items[0]?.volumeInfo.averageRating,
        });
      },
      error: (e) => { },
    });
    this.dataService.getReviewsByISBN(this.isbn).subscribe({
      next: (response) => {
        this.reviews = response.results;
        console.log(response.results);
      },
      error: (e) => { },
    });
  }
  delete(id: any) {
    this.dataService.deleteMeme(id)
      .subscribe(() => {
        this.listarCards();
      });
  }
  patchData(angForm1: any, idCard: number) {
    this.dataService.updateCard(idCard, angForm1.value.comment)
      .subscribe(() => {
        this.isModalActive = false;
        this.listarCards();

      });
  }

  listarCards() {
    this.dataService.getCards().subscribe({
      next: (response) => {
        this.cards = response.filter((res: any) => res.isbn == this.isbn);
        this.myComment = response?.find((res: any) => res.user_id == this.userId && res.isbn == this.isbn)
        this.form.setValue({
          rating: this.myComment?.rating,
        });
      },
      error: (e) => { },
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
  getPostComments(postId: string) {

    return this.comentarios.filter((comentario: any) => comentario?.posteo_id == postId)
  }
  removeComentario(comentarioId: any) {
    this.dataService.removeComentario(comentarioId)
      .subscribe(() => {
        this.listarComentarios();
      });
  }
  hideCommentModal() {
    this.isComentModalActive = false;
  }
  hasLike(postId: any) {
    return this.likes.find((like: any) => like?.posteo_id == postId && like?.user_id == this.userId)
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
  likesLength(postId: any) {
    const likes = this.likes.filter((like: any) => like?.posteo_id == postId)
    return likes.length
  }
  showCommentModal(id: number) {
    this.postId = id;
    this.isComentModalActive = true;
  }
  hideModal() {
    this.isModalActive = false;
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
  shareClick(post_id: number) {
    this.shareOptions = !this.shareOptions;
    this.shareCard = post_id
  }

  shareToUser(user_id: any, post_id: number) {
    this.dataService.addMessage(this.userId, user_id, `${environment.url}/post/${post_id}`)
      .subscribe(() => {
        this.router.navigate([`/chat/${user_id}`])
      });
  }
  getUsers() {
    this.dataService.getUsers()
      .subscribe({
        next: (response) => {
          this.users = response;
          console.log('aca', response)


        },
        error: (e) => { }
      });
  }
  patchCommentData(posteoId: string, texto: any) {
    this.dataService.addComentario(posteoId, texto.value.comment)
      .subscribe(() => {
        this.listarComentarios()
        this.defaultValue = '';
      });
  }
  comentariosLength(postId: any) {
    const comentarios = this.comentarios.filter((comentario: any) => comentario?.posteo_id == postId)
    return comentarios.length
  }
  showModal(id: number) {
    this.editCard = id;
    this.isModalActive = true;
  }
  ngOnInit(): void {
    this.isbn = this.route.snapshot.paramMap.get('id');
    this.getBookDetail();
    this.listarCards();
    this.listarLikes();
    this.getUsers();
    this.userId = this.dataService.getToken();
  }
}

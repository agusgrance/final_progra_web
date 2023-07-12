import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css'],
})
export class PostComponent implements OnInit {
  postId: any;
  postComments: any;
  post: any;
  likes = [];
  users: any;
  userId: any;
  isComentModalActive = false;
  isModalActive = false;
  angForm: FormGroup;
  defaultValue = '';
  isAdmin: boolean;
  shareOptions = false;
  editCard = 0;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dataService: ApiService
  ) {
    this.angForm = this.fb.group({
      comment: ['', Validators.required],
      rating: ['', Validators.required],
      isbn: ['', Validators.required],
    });
    let rol = Number(this.dataService.getRol());
    if (rol == 1) {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  getPosteos() {
    this.dataService.getCards().subscribe({
      next: (response) => {
        this.post = response.find((res: any) => res.id == this.postId);
        console.log(this.post);
      },
      error: (e) => { },
    });
  }
  listarComentarios() {
    this.dataService.getComentarios().subscribe({
      next: (response) => {
        this.postComments = response;
      },
      error: (e) => { },
    });
  }

  getPostComments(postId: string) {
    return this.postComments.filter(
      (comentario: any) => comentario?.posteo_id == postId
    );
  }
  removeComentario(comentarioId: any) {
    this.dataService.removeComentario(comentarioId).subscribe(() => {
      this.listarComentarios();
    });
  }
  getUsers() {
    this.dataService.getUsers().subscribe({
      next: (response) => {
        this.users = response;
      },
      error: (e) => { },
    });
  }
  listarLikes() {
    this.dataService.getLikes().subscribe({
      next: (response) => {
        this.likes = response;
      },
      error: (e) => { },
    });
  }
  hasLike(postId: any) {
    return this.likes.find(
      (like: any) => like?.posteo_id == postId && like?.user_id == this.userId
    );
  }
  addLike(postId: any) {
    this.dataService.addLike(postId).subscribe(() => {
      this.getPosteos();
      this.listarLikes();
    });
  }
  patchData(angForm1: any, idCard: number) {
    this.dataService
      .updateCard(idCard, angForm1.value.comment)
      .subscribe(() => {
        this.isModalActive = false;
        this.getPosteos();
      });
  }
  removeLike(postId: any) {
    const like: any = this.likes.find(
      (like: any) => like?.posteo_id == postId && like?.user_id == this.userId
    );
    this.dataService.removeLike(like.id).subscribe(() => {
      this.getPosteos();
      this.listarLikes();
    });
  }

  likesLength(postId: any) {
    const likes = this.likes.filter((like: any) => like?.posteo_id == postId);
    return likes.length;
  }
  comentariosLength(postId: any) {
    const comentarios = this.postComments.filter(
      (comentario: any) => comentario?.posteo_id == postId
    );
    return comentarios.length;
  }
  delete(id: any) {
    this.dataService.deletePost(id).subscribe(() => {
      this.getPosteos();
    });
  }
  showCommentModal(id: number) {
    this.postId = id;
    this.isComentModalActive = true;
  }
  hideCommentModal() {
    this.isComentModalActive = false;
  }
  showModal(id: number) {
    this.editCard = id;
    this.isModalActive = true;
  }
  hideModal() {
    this.isModalActive = false;
  }
  shareToUser(user_id: any) {
    this.dataService
      .addMessage(this.userId, user_id, `${environment.url}${this.router.url}`)
      .subscribe(() => {
        this.router.navigate([`/chat/${user_id}`]);
      });
  }
  patchCommentData(posteoId: string, texto: any) {
    this.dataService
      .addComentario(posteoId, texto.value.comment)
      .subscribe(() => {
        this.listarComentarios();
        this.defaultValue = '';
      });
  }
  shareClick() {
    this.shareOptions = !this.shareOptions;
  }

  ngOnInit(): void {
    this.postId = this.route.snapshot.paramMap.get('id');
    this.getPosteos();
    this.listarComentarios();
    this.listarLikes();
    this.getUsers();
    this.userId = this.dataService.getToken();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs';
import { ApiService } from '../api.service';
import { Users } from '../users';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  myToken: any;
  user: any;
  userData: any;
  isCurrentProfile: boolean = false;
  angForm: FormGroup;
  users: Users[] = [];
  cards: any = [];
  likes = [];
  isModalActive = false;
  editCard = 0;
  comentarios: any = [];
  defaultValue: string = '';
  postId = 0;
  isComentModalActive = false;
  isAdmin: boolean;
  userId: any;
  editProfile: boolean = false

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private dataService: ApiService, private router: Router) {
    this.user = this.route.snapshot.paramMap.get('id');
    this.myToken = this.dataService.getToken();
    this.isCurrentProfile = this.user == this.myToken
    this.angForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
      password: ['', Validators.required],
      name: ['', Validators.required],
      admin: ['', Validators.required],
    });
    let rol = Number(this.dataService.getRol());
    if (rol == 1) {
      this.isAdmin = true;
    }
    else {
      this.isAdmin = false;
    }
  }
  showEditProfile() {
    this.editProfile = !this.editProfile
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
  listarCards() {
    this.dataService.getCardsParams(this.user).subscribe({
      next: (response) => {
        this.cards = response;
      },
      error: (e) => { },
    });
  }
  listarUser() {
    this.dataService.getProfile(this.user)
      .subscribe({
        next: (response) => {
          this.userData = response[0];

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
  hasLike(postId: any) {
    return this.likes.find((like: any) => like?.posteo_id == postId && like?.user_id == this.myToken)
  }
  addLike(postId: any) {
    this.dataService.addLike(postId)
      .subscribe(() => {
        this.listarCards();
        this.listarLikes();
      });
  }
  removeLike(postId: any) {

    const like: any = this.likes.find((like: any) => like?.posteo_id == postId && like?.user_id == this.myToken)
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
  showCommentModal(id: number) {
    this.postId = id;
    this.isComentModalActive = true;
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

  ngOnInit(): void {

    this.listarCards();
    this.listarLikes();
    this.listarUser()
    this.userId = this.dataService.getToken();
  }

}

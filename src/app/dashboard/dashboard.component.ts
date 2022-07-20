import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { HttpResponse, HttpEventType } from '@angular/common/http';
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
  editCard = 0;

  constructor(private DashboardService: DashboardService, private fb: FormBuilder, private dataService: ApiService, private router: Router) {
    this.angForm = this.fb.group({
      comment: ['', Validators.required],
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
    this.dataService.memeUpload(angForm1.value.comment, this.currentFile.name, memeDate)
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
  patchData(angForm1: any, idCard: number) {
    console.log(angForm1.value.comment, idCard)

    this.dataService.updateCard(idCard, angForm1.value.comment)
      .subscribe(() => {
        this.isModalActive = false;
        this.listarCards();
      });
  }
  showModal(id: number) {
    this.editCard = id;
    this.isModalActive = true;
  }
  hideModal() {
    this.isModalActive = false;
  }
  delete(id: any) {
    this.dataService.deleteMeme(id)
      .subscribe(() => {
        this.listarCards();
      });
  }

  ngOnInit(): void {

    this.listarCards();

  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css'],
})
export class BooksComponent implements OnInit {
  books: any = [];
  constructor(private dataService: ApiService, private router: Router) { }

  getBooks() {
    this.dataService.getBooks().subscribe({
      next: (response) => {
        this.books = response.results.lists;
      },
      error: (e) => { },
    });
  }
  onSearch(e: any) {
    this.books.forEach((book: any, idx: number) => {

      this.books[idx].books = book?.books.filter((b: any) => {
        return b.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1;
      })
    });
  }
  redirectToBook(isbn: string) {
    this.router.navigate([`./bookDetail/${isbn}`]);
  }
  onWheel(event: WheelEvent): void {
    (<any>event.target).parentElement.scrollLeft += event.deltaY;
    event.preventDefault();
  }

  ngOnInit(): void {
    this.getBooks();
  }
}

import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { BookModalComponent } from '../book-modal/book-modal.component';
import { BookService } from '../../services';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  /**
  * Contains EaList data
  */
  bookList: any;
  constructor(private modalService: BsModalService,
    private bookService: BookService) { }

  ngOnInit() {
    this.getAllBooks();
  }
  addBook() {
    this.modalService.show(BookModalComponent,
      {
        class: 'modal-lg',
        backdrop: 'static',
      });
  }
  getAllBooks() {
    this.bookService.getAllBook().pipe().subscribe((res) => {
      console.log(res);
      this.bookList = res.result.books
    }, err => {

    })
  }
  deleteBook(bookId) {
    const reqBody = {
      formData: {
        bookId: bookId
      }
    };
    this.bookService.deleteBook(reqBody).pipe().subscribe((res) => {
      console.log(res);
      this.bookList = res.result.books
    }, err => {

    })
  }
}

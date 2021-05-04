import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BookService } from '../../services';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent implements OnInit {
  /*
  * book form 
 */
  bookForm: FormGroup;
  /*
  * to validate the form after submiting
  */
  submitted = false;
  constructor(private bookStoreFormBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private bookService: BookService) { }

  ngOnInit() {
    this.initializeFormFields();
  }
  private initializeFormFields(): void {
    this.bookForm = this.bookStoreFormBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      publisher: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      category: ['', [Validators.required]],
      cover: ['', [Validators.required]]
    });
  }
  get bookFrm() { return this.bookForm.controls };
  /*
  * submit the form 
 */
  submit() {
    this.submitted = true;
    if (this.bookForm.invalid) {
      return;
    }
    this.addBook();
  }
  /*
 * upload the file
*/
  uploadFile(event) {
    console.log(event);
    const file = (event.target as HTMLInputElement).files[0];
    this.bookForm.patchValue({
      cover: file
    });
    this.bookForm.get('cover').updateValueAndValidity()
  }
  addBook() {
    const formData = new FormData();
    formData.append('title', this.bookForm.value.title);
    formData.append('author', this.bookForm.value.author);
    formData.append('publisher', this.bookForm.value.publisher);
    formData.append('price', this.bookForm.value.price);
    formData.append('description', this.bookForm.value.description);
    formData.append('category', this.bookForm.value.category);
    formData.append('cover', this.bookForm.value.cover);
    const reqBody = {
      formData: formData
    }

    console.log(formData);
    this.bookService.addBook(reqBody).pipe().subscribe((res) => {
      console.log(res);
    }, err => {

    })
  }
}

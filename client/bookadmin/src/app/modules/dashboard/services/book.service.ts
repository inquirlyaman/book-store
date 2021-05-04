import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../core/services';
import { BOOKAPP } from '../../../app-constant';

@Injectable({
  providedIn: 'root'
})
export class BookService extends DataService {
  /**
  * base Url for content api
  */
  baseUrl: string;

  /**
   * reference of lerner service.
   */
  public http: HttpClient;
  constructor(http: HttpClient) {
    super(http);
    this.baseUrl = BOOKAPP.API_PORT;
  }
  /**
 * add Book
 */
  addBook(requestBody) {
    const option = {
      url: '/add-book',
      data: requestBody.formData,
      headers: false
    };
    return this.post(option);
  }
  /**
* get all Book
*/
  getAllBook() {
    const option = {
      url: '/getAllBooks',
    };
    return this.get(option);
  }
  /**
* get all Book
*/
  deleteBook(requestBody) {
    const option = {
      url: '/deleteBook',
      data: requestBody.formData,
      headers: true
    };
    return this.post(option);
  }
}

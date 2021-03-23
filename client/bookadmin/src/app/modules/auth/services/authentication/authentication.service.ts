import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DataService } from '../../../core';
import {BOOKAPP} from '../../../../app-constant';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService  extends DataService{
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
   * login method to authenticate
   */
  signIn(requestBody){
    const option = {
      url: '/signin',
      data: {
        password: requestBody.password,
        email: requestBody.email,
      }
    };
    return this.post(option);
  }
  /**
   * signup method to register the user
   */
  signUp(requestBody){
    const option = {
      url: '/signup',
      data: {
        password: requestBody.password,
        email: requestBody.email,
      }
    };
    return this.post(option);
  }
}

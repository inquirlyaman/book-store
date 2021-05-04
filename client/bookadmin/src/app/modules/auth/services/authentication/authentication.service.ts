import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../../../core';
import { BOOKAPP } from '../../../../app-constant';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';
import * as _ from "lodash";
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends DataService {
  /**
   * base Url for content api
   */
  baseUrl: string;

  /**
   * reference of lerner service.
   */
  public http: HttpClient;
  /**
   * behaviour subject for user after login 
   */
  public user = new BehaviorSubject(undefined);
  public _user = this.user.asObservable();
  constructor(http: HttpClient, public cookieService: CookieService) {
    super(http);
    this.baseUrl = BOOKAPP.API_PORT;
  }
  /**
  *Method to set cokkies*/

  putCookie(key: string, value: any, expirytdate?: Date) {
    if (expirytdate) {
      return this.cookieService.put(btoa(key), btoa(value), { 'expires': expirytdate });
    }
    return this.cookieService.put(btoa(key), btoa(value), { 'httpOnly': true });
  }
  /**
   *Method to get cokkies*/
  getCookie(key: string) {
    if (this.cookieService.get(btoa(key))) {
      return atob(this.cookieService.get(btoa(key)));
    }
  }
  /**
  *Method to  remove cokkies*/
  removCookie() {
    this.cookieService.removeAll();
  }


  /**
   *Method for atob*/

  atob(response) {
    if (_.get(response, 'data')) {
      return JSON.parse(atob(response.data));
    }
  }
  /**
 *Method for btoa*/
  btoa(data) {
    return this.btoa(data);
  }
  /**
   * login method to authenticate
   */
  isAuthenticated() {
    if (this.getCookie('user')) {
      return true;
    } else {
      return false;
    }
  }

  signIn(requestBody) {
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
  signUp(requestBody) {
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

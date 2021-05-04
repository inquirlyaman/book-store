import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  baseUrl: string;
  /**
   * angular HttpClient
   */
  http: HttpClient;
  /**
   * Constructor
   * @param {HttpClient} http HttpClient reference
   */
  constructor(http: HttpClient) {
    this.http = http;
  }
  /**
   * for making post api calls
   * @param {RequestParam} requestParam interface
   */
  post(requestParam: any): Observable<any> {
    const httpOptions: any = {}
    if (requestParam.headers) {
      httpOptions.headers = requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
        httpOptions.params = requestParam.param,
        httpOptions.responseType = requestParam.responseType
    }
    return this.http.post(this.baseUrl + requestParam.url, requestParam.data,
      httpOptions).pipe(mergeMap((data: any) => {
        return of(data);
      }), catchError(this.handleError))
  }


  /**
  * for making get api calls
  * @param {RequestParam} requestParam interface
  */
  get(requestParam: any): Observable<any> {
    const httpOptions = {
      headers: requestParam.header ? this.getHeader(requestParam.header) : this.getHeader(),
      params: requestParam.param,
      responseType: requestParam.responseType
    }
    return this.http.get(this.baseUrl + requestParam.url,
      httpOptions).pipe(mergeMap((data: any) => {
        return of(data);
      }), catchError(this.handleError))
  }
  /**
   * for preperating headers
   */
  private getHeader(headers?: any) {
    const defaultHeaders = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
    if (headers) {
      return { ...defaultHeaders, ...headers };
    } else {
      return { ...defaultHeaders };
    }
  }
  public handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log(error.error.message);
      if (error.error.message) {
        errorMessage = ` ${error.error.message}`;
      }
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log('server  error log <<<<<<<>>>', error);
      if (error.error.message && error.error.message) {
        errorMessage = ` ${error.error.message}`;
      } else if (error.error.status) {
        errorMessage = ` ${error.error.status.description}`;
      } else if (error.error && error.error.error_description) {
        console.log('call inside error >>>>>>>>>>>');
        errorMessage = ` ${error.error.error_description}`;
      }
    }
    // return an observable with a user-facing error message
    return throwError(errorMessage);
  }
}

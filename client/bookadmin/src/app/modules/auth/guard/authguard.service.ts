import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { AuthenticationService } from '../../auth/services';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthenticationService, private router: Router) { }
  canActivate(
    activatedRouteSnapshot: ActivatedRouteSnapshot, routerStateSnapshot: RouterStateSnapshot): Observable<boolean> | boolean {
    if (this.authService.getCookie('user')) {
      return true;
    } else {
      return false;
    }
  }
}

import { AuthService } from './auth.service';
import { Injectable, Inject } from '@angular/core';
import { CanActivate, CanLoad, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {

  constructor(private router: Router, @Inject('auth') private authService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    let url: string = state.url;
    return this.authService.getAuth().map(auth => !auth.hasError);
  }

  canLoad() {
    return this.authService.getAuth()
      .map(auth => !auth.hasError);
  }
  checkLogin(url: string): boolean {

    if (localStorage.getItem('userId') !== null) {
      return true;
    }

    localStorage.setItem('redirectUrl', url);
    this.router.navigate(['/login']);
    return false;
  }

}

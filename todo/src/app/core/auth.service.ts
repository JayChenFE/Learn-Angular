import { Observable } from 'rxjs/RX';
import { Auth } from './../todo/domain/entities';
import { Http } from '@angular/http';
import { Injectable, Inject } from '@angular/core';
import { ReplaySubject } from 'rxjs/ReplaySubject';

@Injectable()
export class AuthService {
  auth: Auth = {
    hasError: true, redirectUrl: '', errMsg: 'not logged in'
  };

  subject: ReplaySubject<Auth> = new ReplaySubject<Auth>(1);


  constructor(private http: Http, @Inject('user') private userService) {
    this.subject.next(this.auth)
  }
  getAuth(): Observable<Auth> {
    return this.subject.asObservable();
  }
  unAuth() {
    this.auth = Object.assign({}, {
      user: null,
      hasError: true,
      redirectUrl: '',
      errMsg: 'not logged in'
    });

    this.subject.next(this.auth);
  }

  loginWithCredentials(username: string, password: string): Promise<Auth> {
    return this.userService
      .findUser(username)
      .map(user => {
        let auth = new Auth();
        // localStorage.removeItem('userId');
        // let redirectUrl = localStorage.getItem('redirectUrl') === null ? '/' : localStorage.getItem('redirectUrl');
        // auth.redirectUrl = redirectUrl;
        if (null === user) {
          auth.hasError = true;
          auth.errMsg = '未找到该用户';
        }
        else if (password === user.password) {
          auth.user = Object.assign({}, user);
          auth.hasError = false;
          localStorage.setItem('userId', user.id);
        }
        else {
          auth.hasError = true;
          auth.errMsg = '密码不匹配';
        }
        this.auth = Object.assign({}, auth);
        this.subject.next(this.auth);
        return this.auth;
      });
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }

}

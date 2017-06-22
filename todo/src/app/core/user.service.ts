import { Http,Headers,Response } from '@angular/http';
import {Observable} from 'rxjs/RX';
import 'rxjs/add/operator/map';
import { Injectable } from '@angular/core';
import { User } from "../todo/domain/entities";

@Injectable()
export class UserService {
  private api_url = 'http://localhost:3000/users'

  constructor(private http: Http) { }

  findUser(username: string): Observable<User> {
    const url = `${this.api_url}/?username=${username}`;
    return this.http.get(url)
      .map(res => {
        let users = res.json() as User[];
        return users.length > 0 ? users[0] : null;
      })

  }

  // private handleError(error: any): Promise<any> {
  //   console.error('An error occurred', error);
  //   return Promise.reject(error.message || error);
  // }
}

import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-login',
  template: `
    <div>
      <input [(ngModel)]="username" type="text">
      <input [(ngModel)]="password" type="text">
      <button (click)="onClick()">Login</button>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  username=""
  password=""
  text = "login componet"
  onClick() {
    alert(`username:${this.username}\n\rpassword:${this.password}`);
    alert(`auth result is:  ${this.service.loginWithCredentials(this.username,this.password)}`);
  }

  constructor( @Inject('auth') private service) {

  }

  ngOnInit() {
  }

}

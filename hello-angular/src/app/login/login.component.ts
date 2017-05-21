import { Component, OnInit, Inject } from '@angular/core';


@Component({
  selector: 'app-login',
  template: `
    <div>
    <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
      <fieldset ngModelGroup="login">
      <input required name="username" [(ngModel)]="username" #usernameRef="ngModel" minlength="3" type="text">
      {{usernameRef.errors|json}}    {{usernameRef.valid}}
      <span *ngIf="usernameRef.errors?.required">必填</span>
      <span *ngIf="usernameRef.errors?.minlength">至少3个字符</span>
      <input  required name="password"  [(ngModel)]="password" #passwordRef="ngModel" type="text">
     <span *ngIf="passwordRef.errors?.required">必填</span>
      <button type="submit">Login</button>
      </fieldset>
    </form>
    </div>
  `,
  styles: []
})
export class LoginComponent implements OnInit {

  username = ""
  password = ""
  text = "login componet"
  // onClick() {
  //   alert(`username:${this.username}\n\rpassword:${this.password}`);
  //   alert(`auth result is:  ${this.service.loginWithCredentials(this.username, this.password)}`);
  // }
  onSubmit(formValue) {
    console.log(`auth result is:${this.service.loginWithCredentials(formValue.login.username, formValue.login.password)}`)

  }
  constructor( @Inject('auth') private service) {

  }

  ngOnInit() {
  }

}

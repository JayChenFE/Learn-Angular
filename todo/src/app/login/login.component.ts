import { Component, OnInit, Inject } from '@angular/core';


/**
 *
 *
 * @export
 * @class LoginComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-login',
  template: `
    <div>
    <form #formRef="ngForm" (ngSubmit)="onSubmit(formRef.value)">
      <fieldset ngModelGroup="login">
      <input required name="username" [(ngModel)]="username" #usernameRef="ngModel" minlength="3" type="text" [placeholder]="holder" (focus)="onfocus()">
      {{usernameRef.errors|json}}    {{usernameRef.valid}}
      <div *ngIf="usernameRef.errors?.required">必填</div>
      <div *ngIf="usernameRef.errors?.minlength">至少3个字符</div>
      <input  required name="password"  [(ngModel)]="password" #passwordRef="ngModel" type="text">
      <div *ngIf="passwordRef.errors?.required">必填</div>
      <button type="submit">Login</button>
      </fieldset>
    </form>
    </div>
  `,
  styles: [`
  input.ng-invalid{
    border:3px solid red;
  }
  input.ng-valid{
    border:3px solid green
  }
  input::-webkit-input-placeholder
  {
    color:red;
    text-align: right;
  }
  input::-ms-input-placeholder{
    color:red;
text-align: right;
  }`]
})
export class LoginComponent implements OnInit {


  username = ""
  password = ""
  holder = "请输入用户名1"
  text = "login componet"
  // onClick() {
  //   alert(`username:${this.username}\n\rpassword:${this.password}`);
  //   alert(`auth result is:  ${this.service.loginWithCredentials(this.username, this.password)}`);
  // }
  onfocus() {
    this.holder = '';
  }
  onSubmit(formValue) {
    console.log(`auth result is:${this.service.loginWithCredentials(formValue.login.username, formValue.login.password)}`)

  }
  constructor( @Inject('auth') private service) {

  }

  ngOnInit() {
  }

}

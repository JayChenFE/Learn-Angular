import { Router, ActivatedRoute, Params } from '@angular/router';
import { Auth } from './../todo/domain/entities';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {

  username = "";
  password = "";
  auth: Auth;
  holder = "请输入用户名";
  // text = "login componet";

  onfocus() {
    this.holder = '';
  }

  constructor( @Inject('auth') private service, private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit(formValue) {
    this.service.loginWithCredentials(formValue.login.username, formValue.login.password)
      .then(auth => {
        let redirectUrl = auth.redirectUrl;
        if (!auth.hasError) {
          this.router.navigate([redirectUrl]);
          localStorage.removeItem('redirectUrl');
        } else {
          this.auth = Object.assign({}, auth);
        }
      })
  }

}

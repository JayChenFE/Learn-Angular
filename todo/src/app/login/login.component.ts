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

  onSubmit() {
    this.service
      .loginWithCredentials(this.username, this.password)
      .subscribe(auth => {

         this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          this.router.navigate(['todo']);
        }
      })
  }

}

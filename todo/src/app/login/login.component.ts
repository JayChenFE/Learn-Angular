
import {
  Component, Inject, trigger, state, style, transition, animate, OnDestroy
} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { MdlDialogService, MdlDialogReference } from '@angular-mdl/core';
import { Auth, Image } from '../todo/domain/entities';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('loginState', [
      state('inactive', style({
        transform: 'scale(1)'
      })),
      state('active', style({
        transform: 'scale(1.3)'
      })),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out'))
    ])
  ]
})

export class LoginComponent implements OnDestroy {

  username = "";
  password = "";
  auth: Auth;
  photo = '/assets/login_default_bg.jpg';
  subscription: Subscription;
  sildes: Image[] = [];
  keyword = "可爱";
  interval;
  loginBtnState = 'inactive';

  constructor(
    @Inject('auth') private authService,
    @Inject('bing') private bingService,
    private dialogService: MdlDialogService,
    private router: Router) {
    this.setBackground(this.keyword);

  }
  changeBG() {
    this.subscription.unsubscribe();
    clearInterval(this.interval);
    this.setBackground(this.keyword);
  }
  setBackground(keyword) {
    this.subscription = this.bingService.getImageUrl(keyword)
      .subscribe((imgs: Image[]) => {
        this.sildes = [...imgs];
        this.rotateImgs(this.sildes)
      })
  }

  onSubmit() {
    this.authService
      .loginWithCredentials(this.username, this.password)
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        if (!auth.hasError) {
          localStorage.setItem('auth', JSON.stringify(this.auth));
          this.router.navigate(['todo']);
        }
      })
  }

  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.subscription.unsubscribe();
    clearInterval(this.interval);
  }

  rotateImgs(imgs: Image[]) {
    const len = imgs.length;
    let i = 0;
    //轮播
    this.interval = setInterval(() => {
      i = (i + 1) % len;
      this.photo = imgs[i].contentUrl;
    }, 4000);
  }

  toggleLoginState(state: boolean) {
    this.loginBtnState = state ? 'active' : 'inactive';
  }

  register($event: MouseEvent) {
    let pDialog = this.dialogService.showCustomDialog({
      component: RegisterDialogComponent,
      isModal: true,
      styles: { 'width': '350px' },
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.map((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    });

  }
}

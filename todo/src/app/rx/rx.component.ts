import { Subscription } from 'rxjs/Subscription';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';

@Component({
  selector: 'app-rx',
  templateUrl: './rx.component.html',
  styleUrls: ['./rx.component.css']
})
export class RxComponent implements OnInit {
  clock = Observable.interval(1000)
    .do(_ => console.log('observable created'));;
  // sub:Subscription
  constructor() {

  }

  ngOnInit() {
  }

  // ngOnDestroy() {
  //   //Called once, before the instance is destroyed.
  //   //Add 'implements OnDestroy' to the class.
  //   if (this.sub!==undefined) {
  //     this.sub.unsubscribe();
  //   }
  // }

}

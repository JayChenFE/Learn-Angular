import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-piple1',
  templateUrl: './piple1.component.html',
  styleUrls: ['./piple1.component.css']
})
export class Piple1Component implements OnInit {
  day:Date = new Date();
  constructor() { }

  ngOnInit() {
  }

}

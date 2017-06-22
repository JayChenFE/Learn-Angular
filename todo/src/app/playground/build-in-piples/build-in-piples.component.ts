import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-build-in-piples',
  templateUrl: './build-in-piples.component.html',
  styleUrls: ['./build-in-piples.component.css']
})
export class BuildInPiplesComponent implements OnInit {
  //decimal piple
  pi: number = 3.141597;

  //currency piple
  a: number = 0.259;
  b: number = 1.3495;
  per: number = 0.123456789;
  obj: Object = {
    foo: "bar",
    baz: "1",
    arr: [
      {
        xyz: 3,
        nums: [1, 2, 3, 4]
      }, {
        test: "a",
        anotherArr: [{ aaa: "bn" }, ["123", 3]]
      }
    ]
  };
  ngOnInit() {
  }

  constructor() { }

}

import { Component, OnInit, Directive, HostListener } from '@angular/core';

@Component({
  selector: '[app-directive]',
  templateUrl: './directive.component.html',
  styleUrls: ['./directive.component.css']
})
export class DirectiveComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  @HostListener('click')
  onClick() {
    alert('clicked');
  }

}

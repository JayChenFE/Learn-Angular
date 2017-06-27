import { element } from 'protractor';
import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'app-todo-header',
  templateUrl: './todo-header.component.html',
  styleUrls: ['./todo-header.component.css']
})

export class TodoHeaderComponent implements OnInit {

  inputValue: string = '';
  @Input() placeholder: string = "123";
  @Input() delay: number = 500;

  @Output() textChanges = new EventEmitter<string>();
  @Output() onEnterUp = new EventEmitter<string>();

  constructor(private elementRef: ElementRef) {
    const event$ = Observable.fromEvent(elementRef.nativeElement, 'keyup')
      .map(() => this.inputValue)
      .debounceTime(this.delay)
      .distinctUntilChanged();
    event$.subscribe(input => this.textChanges.emit(input));
  }

  ngOnInit() {
  }

  enterUp() {
    if (this.inputValue.trim().length === 0) {
      return;
    }
    this.onEnterUp.emit(this.inputValue);
    this.inputValue = '';
  }

}

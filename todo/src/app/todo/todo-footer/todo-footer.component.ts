import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent {
  //声明itemCount时一个可输入值(从引用者处)
  @Input() itemCount: number = 0;
  @Output() onClear = new EventEmitter<boolean>();

  removeCompleted() {
    this.onClear.emit(true);
  }
}

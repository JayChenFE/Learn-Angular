import { Todo } from './../domain/entities';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {

  _todos: Todo[] = [];
  @Input() set todos(todos: Todo[]) {
    this._todos = [...todos];
  }
  get todos() {
    return this._todos;
  }

  @Output() onRemoveTodo = new EventEmitter<Todo>();
  @Output() onToggleTodo = new EventEmitter<Todo>();
  @Output() onToggleAll = new EventEmitter<boolean>();

  onToggleAllTriggered() {
    this.onToggleAll.emit(true);
  }

  onToggleTriggered(todo: Todo) {
    this.onToggleTodo.emit(todo);
  }
  onRemoveTriggered(todo) {
    this.onRemoveTodo.emit(todo);
  }
}

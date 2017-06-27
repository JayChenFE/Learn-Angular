import { Observable } from 'rxjs/Rx';
import { Todo } from './domain/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from './todo.service'

@Component({
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})

export class TodoComponent implements OnInit {

  todos: Observable<Todo[]>;
  desc: string = '';

  constructor(
    @Inject('todoService')
    private service, private route: ActivatedRoute, private router: Router) {

  }

  ngOnInit() {
    this.route.params
      .pluck('filter')
      .subscribe(filter => {
        this.service.filterTodos(filter);
        this.todos = this.service.todos;
      })
  }

  addTodo(desc: string) {
    this.service.addTodo(desc)
  }

  toggleTodo(todo: Todo) {
    this.service.toggleTodo(todo);
  }

  removeTodo(todo: Todo) {
    this.service.deleteTodo(todo);
  }

  //小练习-反转状态
  toggleAll() {
    this.service.toggleAll();
  }
  //小练习-删除所有已完成
  removeCompleted() {
    this.service.removeCompleted();
  }
  onTextChanges(value: string) {
    this.desc = value;
  }

  filterTodos(filter: string) {
    this.service.filterTodos(filter);
  }
}


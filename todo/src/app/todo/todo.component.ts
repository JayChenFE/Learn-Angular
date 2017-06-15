import { Component, OnInit } from '@angular/core';
import { TodoService } from './todo.service'
import { Todo } from './todo.model'


@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoService]
})
export class TodoComponent implements OnInit {

  todos: Todo[] = [];
  desc: string = '';

  constructor(private service: TodoService) {

  }

  ngOnInit() {
    this.getTodos();
  }

  addTodo() {
    this.service.
      addTodo(this.desc)
      .then(todo => {
        this.todos = [...this.todos, todo];
        this.desc = '';
      });
  }

  toggleTodo(todo: Todo) {
    const idx = this.todos.indexOf(todo);
    this.service
      .toggleTodo(todo)
      .then(newTodo => {
        this.todos = [...this.todos.slice(0, idx), newTodo, ...this.todos.slice(idx + 1)]
      });
  }

  removeTodo(todo: Todo) {
    const idx = this.todos.indexOf(todo);
    this.service
      .deleteTodoById(todo.id)
      .then(() => {
        this.todos = [...this.todos.slice(0, idx), ...this.todos.slice(idx + 1)]
      });
  }

  getTodos() {
    this.service.getTodos().then(todos => this.todos = [...todos]);
  }

  //小练习-反转状态
  toggleAll() {
    // this.service.toggleAll().then(todos=>this.todos = [...todos]);
    Promise.all(this.todos.map(todo => this.toggleTodo(todo)));
    // this.todos.forEach(todo => { todo.completed = !todo.completed })
  }
  //小练习-删除所有已完成
  removeCompleted() {
    const completedTodos = this.todos.filter(todo => todo.completed);
    const activeTodos = this.todos.filter(todo => !todo.completed);
    Promise.all(completedTodos.map(todo => this.service.deleteTodoById(todo.id))).then(() => this.todos = [...activeTodos]);
  }
}


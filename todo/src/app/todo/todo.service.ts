import { Todo } from './domain/entities';
import { Injectable, Inject } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { UUID } from 'angular2-uuid'
import 'rxjs/add/operator/toPromise'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class TodoService {
  // private api_url = 'api/todos';
  private api_url = 'http://localhost:3000/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });
  private userId: string;
  private dataStore: {
    todos: Todo[]
  }
  private _todos: BehaviorSubject<Todo[]>;

  constructor(private http: Http, @Inject('auth') private authService) {

    this.authService.getAuth()
      .filter(auth => auth.user != null)
      .subscribe(auth => this.userId = auth.user.id);

    this.dataStore = { todos: [] };
    this._todos = new BehaviorSubject<Todo[]>([]);
  }
  get todos() {
    return this._todos.asObservable();
  }
  // POST /todos
  addTodo(desc: string) {
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false,
      userId: this.userId
    };
    return this.http
      .post(this.api_url, JSON.stringify(todo), { headers: this.headers })
      .map(res => res.json() as Todo)
      .subscribe(todo => {
        this.dataStore.todos = [...this.dataStore.todos, todo];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      })
  }
  // It was PUT /todos/:id before
  // But we will use PATCH /todos/:id instead
  // Because we don't want to waste the bytes those don't change
  toggleTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.http
      .patch(url, JSON.stringify({ completed: !todo.completed }), { headers: this.headers })
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0, i),
          updatedTodo,
          ...this.dataStore.todos.slice(i + 1)
        ];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // DELETE /todos/:id
  deleteTodo(todo: Todo) {
    const url = `${this.api_url}/${todo.id}`;
    const i = this.dataStore.todos.indexOf(todo);
    return this.http
      .delete(url, { headers: this.headers })
      .subscribe(_ => {
        this.dataStore.todos = [
          ...this.dataStore.todos.slice(0, i),
          ...this.dataStore.todos.slice(i + 1)
        ];
        this._todos.next(Object.assign({}, this.dataStore).todos);
      });
  }
  // GET /todos
  getTodos() {
    return this.http.get(`${this.api_url}?userId=${this.userId}`)
      .map(res => res.json() as Todo[])
      .subscribe(todos => this.updateStoreAndSubject(todos));
  }

  //GET /todos?completed=true/false
  filterTodos(filter: string) {
    const url = `${this.api_url}?userId=${this.userId}`;

    switch (filter) {
      case 'active':
        return this.http.get(`${url}&completed=false`)
          .map(res => res.json() as Todo[])
          .subscribe(todos => this.updateStoreAndSubject(todos));

      case 'completed':
        return this.http.get(`${url}&completed=true`)
          .map(res => res.json() as Todo[])
          .subscribe(todos => this.updateStoreAndSubject(todos));

      default:
        return this.getTodos();
    }
  }

  toggleAll() {
    this.dataStore.todos.forEach(todo => this.toggleTodo(todo))
  }

  removeCompleted() {
    this.dataStore.todos
      .filter(todo => todo.completed)
      .forEach(todo => this.deleteTodo(todo));
  }
  private updateStoreAndSubject(todos) {
    this.dataStore.todos = [...todos];
    this._todos.next(Object.assign({}, this.dataStore).todos);
  }
}

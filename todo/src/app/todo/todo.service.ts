import { Injectable } from '@angular/core';
import { Http, Headers } from "@angular/http";
import { UUID } from 'angular2-uuid'
import { Todo } from './todo.model'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class TodoService {
  private api_url = 'api/todos';
  private headers = new Headers({ 'Content-Type': 'application/json' });

  todos: Todo[] = [];

  constructor(private http: Http) {

  }

  // addTodo(todoItem: string): Todo[] {
  //   let todo = {
  //     id: UUID.UUID(),
  //     desc: todoItem,
  //     completed: false
  //   };
  //   this.todos.push(todo);
  //   return this.todos;
  // }

  //POST /todos
  addTodo(desc: string): Promise<Todo> {
    let todo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    };

    return this.http.post(this.api_url, JSON.stringify(todo), { headers: this.headers })
      .toPromise().
      then(res => res.json().data as Todo)
      .catch(this.handleError)
  }

  //PUT /todos/id
  toggleTodo(todo: Todo): Promise<Todo> {
    const url = `${this.api_url}/${todo.id}`;
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    return this.http
      .put(url, JSON.stringify(updatedTodo), { headers: this.headers })
      .toPromise()
      .then(() => updatedTodo)
      .catch(this.handleError);
  }

  //DELETE /todos/id
  deleteTodoById(id: string): Promise<void> {
    const url = `${this.api_url}/${id}&dd65a7c0-e24f-6c66-862e-0999ea504ca0`;
    console.log(url);
    return this.http
      .delete(url, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);

  }
  //GET /todos
  getTodos(): Promise<Todo[]> {
    return this.http
      .get(this.api_url)
      .toPromise()
      .then(res => res.json().data as Todo[])
      .catch(this.handleError);
  }

  //PUT /todos/id
  // toggleAll(): Promise<Todo[]> {
  //   this.todos.forEach(todo => { todo.completed = !todo.completed })
  //   return this.http
  //     .put(this.api_url, JSON.stringify(this.todos), { headers: this.headers })
  //     .toPromise()
  //     .then(() => this.todos)
  //     .catch(this.handleError);
  // }

  // removeCompleted():Promise<Todo[]>{

  // }
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}

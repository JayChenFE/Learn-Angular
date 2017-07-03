import { TOGGLE_TODO, ADD_TODO, REMOVE_TODO, TOGGLE_ALL, CLEAR_COMPLETED } from './../actions/todo.action';
import { UUID } from 'angular2-uuid';
import { Observable } from 'rxjs/Rx';
import { Todo } from './domain/entities';
import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { TodoService } from './todo.service'
import { Store } from "@ngrx/store";

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

    private service,
    private route: ActivatedRoute,
    private router: Router,
    private store$: Store<Todo[]>) {

    const fetchData$ = this.store$.select('todos')
      .startWith([]);
    // const filterData$ = this.store$.select('todoFilter');
    // this.todos = Observable.combineLatest(
    //   fetchData$,
    //   filterData$,
    //   (todos: Todo[], filter: any) => todos.filter(filter)

    const filterData$ = this.route.params.pluck('filter')
      .do(value => {
        const filter = value as string;
        this.store$.dispatch({ type: filter });
      })
      .flatMap(_ => this.store$.select('todoFilter'));

    this.todos = Observable.combineLatest(
      fetchData$,
      filterData$,
      (todos: Todo[], filter: any) => todos.filter(filter)
    )
  }

  ngOnInit() {
    this.route.params
      .pluck('filter')
      .subscribe(value => {
        const filter = value as string;
        this.store$.dispatch({ type: filter });
        // this.service.filterTodos(filter);
        // this.todos = this.service.todos;
      })
  }

  addTodo(desc: string) {
    let newTodo = {
      id: UUID.UUID(),
      desc: desc,
      completed: false
    }
    this.store$.dispatch({
      type: ADD_TODO,
      payload: newTodo
    })
    //this.service.addTodo(desc)
  }

  toggleTodo(todo: Todo) {
    let updatedTodo = Object.assign({}, todo, { completed: !todo.completed });
    this.store$.dispatch({
      type: TOGGLE_TODO,
      payload: updatedTodo
    });
    //this.service.toggleTodo(todo);
  }

  removeTodo(todo: Todo) {
    this.store$.dispatch({
      type: REMOVE_TODO,
      payload: todo
    });
    //this.service.deleteTodo(todo);
  }

  //小练习-反转状态
  toggleAll() {
    this.store$.dispatch({
      type: TOGGLE_ALL
    });
    //this.service.toggleAll();
  }
  //小练习-删除所有已完成
  removeCompleted() {
    this.store$.dispatch({
      type: CLEAR_COMPLETED
    });
    //this.service.removeCompleted();
  }
  onTextChanges(value: string) {
    this.desc = value;
  }

  filterTodos(filter: string) {
    this.service.filterTodos(filter);
  }
}


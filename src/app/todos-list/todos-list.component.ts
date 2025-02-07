import { Component, inject } from '@angular/core';
import { TodoCardComponent } from './todo-card/todo-card.component';
import { TodosApiService } from '../todos-api.service';
import { NgFor } from '@angular/common';


export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todos-list.component.html',
  styleUrl: './todos-list.component.scss',
  standalone: true,
  imports: [NgFor, TodoCardComponent],
})
export class TodosListComponent {
  readonly todosApiService  = inject(TodosApiService);
  todos: Todo[] = [];

  constructor() {
    this.todosApiService.getTodos().subscribe((response: any) => {
      this.todos = response;
    });
  }

  deleteTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }
}

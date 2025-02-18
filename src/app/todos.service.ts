import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Todo } from './todos-list/todos-list.component';

@Injectable({ providedIn: 'root' })
 
export class TodosService {
  TodosSubject$ = new BehaviorSubject <Todo[]>([]);

  setUser(users: Todo[]) {
    this.TodosSubject$.next(users);
  }

  editUser(editedUser: Todo) {
    this.TodosSubject$.next(
      this.TodosSubject$.value.map(
        user => {
        if (user.id === editedUser.id) {
          return editedUser;
        } else {
          return user;
        }
      })
    );
  }

  


  createTodo(todo: Todo) {
    this.TodosSubject$.next([...this.TodosSubject$.value, todo]);
  }

  deleteUser(id: number) {
    this.TodosSubject$.next(
      this.TodosSubject$.value.filter((item) => {
        if (id === item.id) {
          return false;
        } else {
          return true;
        }
      })
    );

  }
}

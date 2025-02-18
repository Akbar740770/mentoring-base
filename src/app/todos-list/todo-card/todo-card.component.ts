import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Todo } from "../todos-list.component";

@Component({
  selector: 'app-todo-card',
  templateUrl: './todo-card.component.html',
  styleUrl: './todo-card.component.scss',
  standalone: true,
  imports: [],
})
export class TodoCardComponent {
form: any;
submitForm() {
throw new Error('Method not implemented.');
}
  @Input()
  todo: any;

  @Output()
  deleteTodo = new EventEmitter();

  OnDeleteTodo(todoId: number) {
    this.deleteTodo.emit(todoId);
  }
}
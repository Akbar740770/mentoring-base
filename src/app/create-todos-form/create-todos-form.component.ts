import { Component, EventEmitter, Output } from "@angular/core";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

export function completedValidator(): ValidatorFn{
  return(control:AbstractControl):ValidationErrors | null => {
    const value = control.value?.trim().toLowerCase();
    if (value === 'да' || value === 'нет'){
      return null;
    }
    return { invalidCompleted: true };
  };
}


@Component({
  selector: 'app-create-todos-form',
  standalone: true,
  templateUrl: './create-todos-form.html',
  styleUrls: ['./create-todos-form.scss'],
  imports: [ReactiveFormsModule],
})
export class CreatetodosFormComponent {
  @Output()
  createtodosOuput = new EventEmitter();

  public formTodo = new FormGroup({
    title: new FormControl('', [Validators.required]),
    userId: new FormControl('', [Validators.required]),
    completed: new FormControl('', [Validators.required, completedValidator()]),
  });

  private getCompletedValue(): boolean{
    const value = this.formTodo.get('completed')?.value!.trim().toLowerCase();
    if(value === 'да')
      return true
    else return false
  }

  public submitFormTodo(): void {
    this.createtodosOuput.emit({...this.formTodo.value, completed: this.getCompletedValue()});
    this.formTodo.reset();
  }
}
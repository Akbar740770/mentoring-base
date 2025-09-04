import { createActionGroup, props } from "@ngrx/store";
import { User } from "../users-list.component";

export const UserActions = createActionGroup({
  source: 'Users',
  events: {
    'Set': props<{ users: User[] }>(),            // массив пользователей
    'Edit': props<{ user: User }>(),              // один пользователь
    'Create': props<{ user: User }>(),            // один пользователь
    'Delete': props<{ id: number }>(),            // одно ID
  }
});

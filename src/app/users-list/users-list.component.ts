import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../user-api.service";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog } from "@angular/material/dialog";
import { CreateUserModalComponent } from "./create-user-modal/create-user-modal";
import { MatButtonModule } from "@angular/material/button";
import { ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { Store } from "@ngrx/store";
import { UserActions } from "./store/user.actions";
import { selectUsers } from "./store/users.selectors";

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  address?: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone?: string;
  website: string;
  company: {
    name: string;
    catchPhrase?: string;
    bs?: string;
  };
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [
    NgFor,
    UserCardComponent,
    AsyncPipe,
    CreateUserFormComponent,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {

  
  private readonly store = inject(Store);
  readonly users$ = this.store.select(selectUsers);
  dialog = inject(MatDialog);
  private readonly UsersApiService = inject(UsersApiService);

  constructor() {
    this.UsersApiService.getUsers().subscribe((response: any) => {
      this.store.dispatch(UserActions.set({ users: response }));
    });
  }


  

  createUser(formData: any) {
    const user = {
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName,
      },
    };

    this.store.dispatch(UserActions.create({ user }));
  }

  deleteUsers(id: number) {
    this.store.dispatch(UserActions.delete({ id }));
  }

  editUser(user: any) {
    const updatedUser = {
      ...user,
      company: {
        name: user.companyName,
      },
    };

    this.store.dispatch(UserActions.edit({ user: updatedUser }));
  }

  openCreateUserModal(): void {
    const dialogRef = this.dialog.open(CreateUserModalComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.createUser(result);
      }
    });
  }




  
}


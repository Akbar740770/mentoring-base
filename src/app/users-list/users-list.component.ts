import { AsyncPipe, NgFor } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject } from "@angular/core";
import { UsersApiService } from "../user-api.service";
import { UsersService } from "../users.sevice";
import { UserCardComponent } from "./user-card/user-card.component";
import { CreateUserFormComponent } from "../create-user-form/create-user-form.component";
export interface User{
  
    "id": number,
    "name": string,
    "username"?: string,
    "email": string,
    
    "address"?: {
      "street": string,
      "suite": string,
      "city": string,
      "zipcode": string,

      "geo": {
        "lat": string,
        "lng": string,
      }
    },
    
    "phone"?: string,
    "website": string,

    "company": {

      "name": string,
      "catchPhrase"?: string,
      "bs"?: string,
    }
  
}

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.scss',
  standalone: true,
  imports: [NgFor, UserCardComponent, AsyncPipe, CreateUserFormComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  readonly UsersApiService = inject(UsersApiService);
  readonly usersService = inject(UsersService);

  constructor() {
    this.UsersApiService.getUsers().subscribe((response: any) => {
      this.usersService.setUser(response);
    });
  }

  deleteUsers(id: number) {
    this.usersService.deleteUser(id);
  }

  public createUser(formData: any) {
    this.usersService.createUser({
      id: new Date().getTime(),
      name: formData.name,
      email: formData.email,
      website: formData.website,
      company: {
        name: formData.companyName,
      },
    });
  }
}



import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./users-list/users-list.component";

@Injectable({providedIn: 'root'})

export class UsersApiService{
    createUser(event: any) {
      throw new Error("Method not implemented.");
    }
    readonly apiService = inject(HttpClient);
    
    getUsers(): Observable<User[]> {
        return this.apiService.get<User[]>('https://jsonplaceholder.typicode.com/users');
    }
}
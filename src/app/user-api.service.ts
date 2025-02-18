import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";

@Injectable({providedIn: 'root'})

export class UsersApiService{
    createUser(event: any) {
      throw new Error("Method not implemented.");
    }
    readonly apiService = inject(HttpClient);
    
    getUsers(){
        return this.apiService.get('https://jsonplaceholder.typicode.com/users');
    }
}
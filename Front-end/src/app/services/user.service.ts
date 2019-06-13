import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject(new User);
  public selectedPostAsObservable = this.userSource.asObservable();
  private selectedUser : User;

  private usersSource = new BehaviorSubject([]); 
  public users = this.usersSource.asObservable();
  private localUsers : User[] = [];

  constructor(private http: HttpClient) { }

  setSelectedUser(user: User){
    this.userSource.next(user);
    this.selectedUser = user;
    console.log("current selected user: " + user);
  }

  getSelectedUser(){
    return this.selectedUser;
  }

  getUsers() {
    this.http.get<User[]>(`${environment.apiUrl}/users`).pipe(first()).subscribe(users => {
        this.usersSource.next(users);
        this.localUsers = users;
    });
  }

  getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/` + id);
  }
}

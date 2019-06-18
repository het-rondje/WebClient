import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { PublicUser } from 'src/app/models/publicUser';
import { environment } from '../../environments/environment';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSource = new BehaviorSubject(new User);
  public selectedUserAsObservable = this.userSource.asObservable();
  private selectedUser : User;

  private usersSource = new BehaviorSubject([]); 
  public users = this.usersSource.asObservable();
  private localUsers : User[] = [];
  public userKeys: any[] = [];

  constructor(private http: HttpClient) { }

  setSelectedUser(user: User){
    localStorage.setItem('selectedUser', JSON.stringify(user));
    this.userSource.next(user);
    this.selectedUser = user;
    console.log("current selected user: " + user.firstName);
  }

  getSelectedUser(){
    this.selectedUser = JSON.parse(localStorage.getItem('selectedUser'));
    this.userSource.next(this.selectedUser);
    return this.selectedUser;
  }

  getPublicKeys() {
    return this.http.get<PublicUser[]>(`${environment.apiUrl}/publickeys`).pipe(first());
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

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

//Hash package importeren

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private date: number;
  private message: string;
  private hashedMessage: string;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(privateKey: String) {
    //Set date to now:
    this.date = Date.now();

    //Create message:
    this.message = this.date + "-login";

    //Hash message + encrypt hash:
    this.digitalSignature(privateKey, this.message);


    return this.http.post<any>(`${environment.apiUrl}/login`, { /* digital signature here */ })
    .pipe(map(user => {
        // login successful if there's a jwt token in the response
        console.log('token -> ' + user.token);
        if (user && user.token) {
            console.log("valid");
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }
        return user;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
}

  digitalSignature(privateKey: String, message: string) {
    //Hashing message:
    var hash = require('hash.js');
    this.hashedMessage = hash.sha256().update(message).digest('hex');
    console.log(message);
    console.log(this.hashedMessage);

    //Hash encrypten:
    

    //return encrypted hash
    return message;
  }

}
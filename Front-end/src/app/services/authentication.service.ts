import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as hash from 'hash.js';
import * as crypto from 'crypto-js';
import * as jsencrypt from 'jsencrypt';

import { Router } from '@angular/router';

//Hash package importeren

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private loggedIn: boolean = false;

  private hashedMessage: string;
  public signature: string;
  private httpOptions = {};

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(privateKey: string, id: string) {
    let body = {}

    let date = new Date;
    let timestamp = date.getTime().toString(); //FORMAT??

    const timeSignature = this.digitalSignature(privateKey, timestamp);

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'signature': sig, // body signature NOT FOR LOGIN
        'timestamp': timestamp,
        'signature': timeSignature,
        'timesignature': timeSignature,
        'userid': id,
        'id': id
      })
    };

    return this.http.post('http://localhost:3000/api/users/' + id, body, this.httpOptions)
      .pipe(
        map(result => {
          console.log(result)

          let user: User =new User;
          let json = JSON.stringify(result);
          let obj = JSON.parse(json)
          user._id = obj.user.id;
          user.firstName = obj.user.firstName;
          user.lastName = obj.user.lastName;

          localStorage.setItem('currentUser', JSON.stringify(user));
          console.log(user)
          this.loggedIn = true;
          return user;
        })
      )
  }


  private digitalSignature(privateKey: string, content: any) {
    //Hashing content:
    this.hashedMessage = this.hash(content);

    //Return signature
    return this.encryptData(this.hashedMessage, privateKey);
  }

  //Hashes a given string message with sha256
  private hash(message: string) {
    return hash.sha256().update(message).digest('hex');
  }

  //Encrypts given data with this.encryptSecretKey
  private encryptData(data, privateKey: string) {
    try {
      var encrypt = new jsencrypt.JSEncrypt();
      encrypt.setPublicKey(privateKey);
      //console.log(JSON.stringify(data));
      //console.log(encrypt.encrypt(JSON.stringify(data)));
      console.log(encrypt.getKey().encrypt(JSON.stringify(data)))
      return encrypt.getKey().encrypt(JSON.stringify(data));

      //return crypto.AES.encrypt(JSON.stringify(data), privateKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.loggedIn = false;
    this.currentUserSubject.next(null);
    this.router.navigate(['/login'])
  }

  isLoggedIn(){
    return this.loggedIn;
  }

}
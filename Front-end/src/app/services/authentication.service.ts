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
  private message: string = "";
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

    //Object Back-end wants when sending a chat message:
    var a: { id: string, message: string, signature: string };

    //Create message:
    this.message = this.date + "-login";
    //Add userID

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
    /*
    //Hashing message:
    var hash = require('hash.js');
    this.hashedMessage = hash.sha256().update(message).digest('hex');
    console.log('Message to encrypt: ' + message);
    console.log('Hash from message: ' + this.hashedMessage);

    //Hash encrypten:

    // //Jan's piece
    // const fs = require('fs')
    // const crypto = require('crypto')

    // // Get key //Might have to get it from a parameter
    // const pem = fs.readFileSync('../private.pem')
    // const key = pem.toString('ascii')

    // //Create Signature
    // const sign = crypto.createSign('RSA-SHA256')
    // sign.update(this.hashedMessage)
    // // const sig = sign.sign(key,'hex')
    // const sig = sign.sign(privateKey,'hex')
    // console.log('Signature: ' + sig)

    const NodeRSA = require('node-rsa');
    //Get Key
    const key = new NodeRSA(privateKey);
    
    const text = 'Hello RSA!';

    //Enrypt
    const encrypted = key.encrypt(text, 'hex');
    console.log('encrypted: ', encrypted);

    //return encrypted hash
    return message;*/
  }


  //return encrypted hash


}
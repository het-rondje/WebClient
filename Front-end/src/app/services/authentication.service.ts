import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as hash from 'hash.js';
import * as crypto from 'crypto-js';

//Hash package importeren

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private date: number;
  private message: string = "";
  private hashedMessage: string;

  private encryptSecretKey = "-----BEGIN RSA PRIVATE KEY----- MIICXgIBAAKBgQDHikastc8+I81zCg/qWW8dMr8mqvXQ3qbPAmu0RjxoZVI47tvskYlFAXOf0sPrhO2nUuooJngnHV0639iTTEYG1vckNaW2R6U5QTdQ5Rq5u+uV3pMk7w7Vs4n3urQ6jnqt2rTXbC1DNa/PFeAZatbf7ffBBy0IGO0zc128IshYcwIDAQABAoGBALTNl2JxTvq4SDW/3VH0fZkQXWH1MM10oeMbB2qO5beWb11FGaOO77nGKfWcbYgfp5Ogrql4yhBvLAXnxH8bcqqwORtFhlyV68U1y4R+8WxDNh0aevxH8hRS/1X5031DJm1JlU0E+vStiktN0tC3ebH5hE+1OxbIHSZ+WOWLYX7JAkEA5uigRgKp8ScGauUijvdOLZIhHWq7y5Wz+nOHUuDw8P7wOTKU34QJAoWEe771p9Pf/GTA/kr0BQnPQvWUDxGzJwJBAN05C6krwPeryFKrKtjOGJIniIoY72wRnoNcdEEs3HDRhf48YWForiRbZylzzzNFy/gmzT6XJQTfktGqq+FZD9UCQGIJaGrxHJgfmpDuAhMzGsUsYtTriRox0D1Iqa7dhE693t5aBG010OF6MLqdZA1CXrn5SRtuVVaCSLZEL/2J5UcCQQDAd3MXucNnN4NPuS/L9HMYJWD7lPoosaORcgyK77bSSNgk+u9WSjbH1uYIAIPSffUZbti+jc1dUg5wb+aeZlgJAkEAurrpmpqj5vg087ZngKfFGR5rozDiTsK5DceTV97Ka3Y+Nzl+XWTxDBWk4YPh2ZlKv402hZEfWBYxUDn5ZkH/bw== -----END RSA PRIVATE KEY-----";

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

    //Hash message + encrypt hash:
    this.digitalSignature(privateKey, this.message);

    // return this.http.post<any>(`${environment.apiUrl}/login`, { /* digital signature here */ })
    //   .pipe(map(user => {
    //     // login successful if there's a jwt token in the response
    //     console.log('token -> ' + user.token);
    //     if (user && user.token) {
    //       console.log("valid");
    //       // store user details and jwt token in local storage to keep user logged in between page refreshes
    //       localStorage.setItem('currentUser', JSON.stringify(user));
    //       this.currentUserSubject.next(user);
    //     }
    //     return user;
    //   }));
  }

  digitalSignature(privateKey: String, message: string) {
    //Hashing message:
    this.hashedMessage = hash.sha256().update(message).digest('hex');

    console.log('Message to encrypt: ' + message);
    console.log('Hash from message: ' + this.hashedMessage);
    console.log('Encrypted: ' + this.encryptData(this.hashedMessage))

    //Return encrypted hash
    return this.encryptData(this.hashedMessage)

  }

  encryptData(data) {
    try {
      return crypto.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
    } catch (e) {
      console.log(e);
    }
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
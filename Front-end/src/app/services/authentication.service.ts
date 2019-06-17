import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import * as hash from 'hash.js';
import * as crypto from 'crypto-js';

//Hash package importeren

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private randomString: string = "";
  private hashedMessage: string;
  private userId: string;
  public signature: string;
  private httpOptions = {};
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

    // const sig = this.digitalSignature(privateKey, this.generateRandomString(15));
    const sig = this.digitalSignature(privateKey, '');
    let timestamp = Date.now.toString();
    const timeSignature = this.digitalSignature(privateKey, timestamp);

    let body = { 'randomString': this.randomString }

    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'signature': sig,
        'timestamp': timestamp,
        'timeSignature': timeSignature,
        'id': this.userId
      })
    };

    return this.http.post('${environment.apiUrl}/users' + this.userId, body, this.httpOptions)
      .pipe(
        map(result => {
          let user: User;
          let json = JSON.stringify(result);
          let obj = JSON.parse(json)
          user._id = obj._id;
          user.firstname = obj.user.firstname;
          user.lastname = obj.user.lastname;
          //not in response..
          //user.messages = obj.messages;

          //localStorage.setItem('currentUser', JSON.stringify(user));
          return user;
        })
      )
  }


  private digitalSignature(privateKey: String, content: any) {
    //Generate random string:
    //this.randomString = this.generateRandomString(15);

    //Hashing message:
    this.hashedMessage = this.hash(content);

    console.log('Message to encrypt: ' + content);
    console.log('Hash from message: ' + this.hashedMessage);
    console.log('Encrypted: ' + this.encryptData(this.hashedMessage))

    //Return signature
    //this.signature = this.encryptData(this.hashedMessage);
    return this.encryptData(this.hashedMessage);
  }

  //Generate a random string:
  // private generateRandomString(length: number) {
  //   var result = '';
  //   var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  //   var charactersLength = characters.length;
  //   for (var i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  //   }
  //   return result;
  // }

  //Hashes a given string message with sha256
  private hash(message: string) {
    return hash.sha256().update(message).digest('hex');
  }

  //Encrypts given data with this.encryptSecretKey
  private encryptData(data) {
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
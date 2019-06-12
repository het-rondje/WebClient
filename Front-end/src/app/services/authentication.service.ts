import { Injectable } from '@angular/core';
//Hash package importeren

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private date: number;
  private message: string;
  private hashedMessage: string;

  constructor() { }

  login(privateKey: String) {
    //Set date to now:
    this.date = Date.now();

    //Create message:
    this.message = this.date + "-login";

    //Hash message + encrypt hash:
    this.digitalSignature(privateKey, this.message);
  }

  digitalSignature(privateKey: String, message: string) {
    //Hashing message:
    var hash = require('hash.js');
    this.hashedMessage = hash.sha256().update(message).digest('hex');
    console.log(message);
    console.log(this.hashedMessage);

    //Hash encrypten:
    

    //return encrypted hash
  }

}
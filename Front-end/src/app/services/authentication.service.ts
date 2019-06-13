import { Injectable } from '@angular/core';

//Hash package importeren

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private date: number;
  private message: string = "";
  private hashedMessage: string;

  constructor() { }

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

    //return ...
  }

  digitalSignature(privateKey: String, message: string) {
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

  }


  //return encrypted hash


}
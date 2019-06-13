import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})


export class ChatService {
  messages: string[] = [];
 

  
  constructor(private socket: Socket, private http: HttpClient) { 
    this.socket.on('message', (data) => { 
      this.messages.push(data);
     })
  }

  sendMessage(msg: string){

    var message: Message = {     
      user: new User(),
      text: msg,
      timePosted: new Date()
  }

    this.socket.emit("message", message);
    console.log('send message: ' + message);
  }
  

}

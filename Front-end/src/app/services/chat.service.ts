import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  messages: string[] = [];
  roomId: string = "123";


  constructor(private socket: Socket) { 
    this.socket.on('message', (data) => { 
      console.log("data: " + data);
      console.log("room: " + data.roomId);
      this.messages.push(data);
     })
  }

  sendMessage(msg: string){

    var message: Message = {     
      user: new User(),
      text: msg,
      timePosted: new Date(),
      roomId: this.roomId
  }

    this.socket.emit("message", message);
    console.log('send message: ' + message);
  }
}

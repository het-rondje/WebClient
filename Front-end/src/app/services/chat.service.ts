import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})

export class ChatService {
  messages: string[] = [];
  roomId: string = "5d0223153908181fdc4ec9ac";
  currentUser: User;

  constructor(private socket: Socket, private authenticationService: AuthenticationService) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.socket.on('message', (data) => { 
      console.log("data: " + data);
      console.log("room: " + data.roomId);
      this.messages.push(data);
     })
  }

  joinRoom(roomId: string){
    this.socket.emit("join", roomId);
    console.log('joined room: ' + roomId)
  }

  sendMessage(msg: string){

    var message: Message = {     
      user: this.currentUser,
      text: msg,
      timePosted: new Date(),
      roomId: this.roomId
  }

    this.socket.emit("message", message);
    console.log('send message: ' + message);
  }
}

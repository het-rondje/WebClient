import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


import { AuthenticationService } from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})


export class ChatService {
  messages: string[] = [];
  roomId: string = "5d02242d3908181fdc4ec9ae";
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

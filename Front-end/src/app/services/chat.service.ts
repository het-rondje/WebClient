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
  roomId: string = "5cff9cf3b15c9b3334118bc2";


  
  constructor(private socket: Socket, private http: HttpClient) { 
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
      user: new User(),
      text: msg,
      timePosted: new Date(),
      roomId: this.roomId
  }

    this.socket.emit("message", message);
    console.log('send message: ' + message);
  }
}

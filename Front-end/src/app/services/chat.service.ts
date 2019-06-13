import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';


import { AuthenticationService } from '../services/authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class ChatService {
  messages: string[] = [];
  currentUser: User;
  selectedUser: User;

  constructor(private socket: Socket, private authenticationService: AuthenticationService,
    private userService: UserService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.socket.on('message', (data) => { 
      console.log("data: " + data);
      console.log("room: " + data.roomId);
      this.messages.push(data);
     })

     this.userService.selectedUserAsObservable.subscribe(data => {
      this.selectedUser = data;
      console.log("selected user: " + data);
    })
    this.userService.getSelectedUser();
  }

  joinRoom(){
    this.socket.emit("join", this.selectedUser._id);
    console.log('joined room: ' + this.selectedUser._id)
  }

  sendMessage(msg: string){

    var message: Message = {     
      user: this.currentUser,
      text: msg,
      timePosted: new Date(),
      roomId: this.selectedUser._id
  }

    this.socket.emit("message", message);
    console.log('send message: ' + message);
  }
}

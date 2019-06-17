import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


import { AuthenticationService } from '../services/authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class ChatService {
  messages: Message[] = [];
  currentUser: User;
  selectedUser: User;

  constructor(private http: HttpClient, private socket: Socket, private authenticationService: AuthenticationService,
    private userService: UserService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.socket.on('message', (data) => { 
      console.log("as data: " + data.text);
      this.messages.push(data);
     })

     this.userService.selectedUserAsObservable.subscribe(data => {
      this.selectedUser = data;
    })
    this.userService.getSelectedUser();
  }

  joinRoom(){
    this.socket.emit("join", this.selectedUser._id);
    console.log('joined room: ' + this.selectedUser._id)
    this.getChatHistory();
  }

  getChatHistory(){
    this.http.get<User>(`${environment.apiUrl}/users/` + this.selectedUser._id).pipe(first()).subscribe(user => {
      this.messages = user.messages;
  });

  }

  sendMessage(msg: string){

    var message: Message = {     
      sender: this.currentUser,
      text: msg,
      roomId: this.selectedUser._id
  }

    this.socket.emit("message", message);
    console.log('send message: ' + message.roomId);
  }
}

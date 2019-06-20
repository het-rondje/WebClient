import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { first } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Message } from '../models/message';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';


import { AuthenticationService } from '../services/authentication.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})


export class ChatService {
  localMessages: Message[] = [];
  currentUser: User;
  selectedUser: User;
  private messageSource = new BehaviorSubject([]); 
  public messages = this.messageSource.asObservable();


  constructor(private http: HttpClient, private socket: Socket, private authenticationService: AuthenticationService,
    private userService: UserService) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    this.socket.on('message', (data) => {
      console.log("as data: " + data.text);
      this.localMessages.push(data);
      this.messageSource.next(this.localMessages);
      if(data.text.startsWith('!donate')){
        this.playAudio();
      }
    })

    this.userService.selectedUserAsObservable.subscribe(data => {
      this.selectedUser = data;
    })
    this.userService.getSelectedUser();
  }

  async joinRoom() {
    this.socket.emit("join", this.selectedUser._id);
    console.log('joined room: ' + this.selectedUser._id)
    this.getChatHistory();
  }

  getChatHistory() {
    this.http.get<User>(`${environment.apiUrl}/users/` + this.selectedUser._id).pipe(first()).subscribe(user => {
      this.localMessages = user.messages;
      this.messageSource.next(this.localMessages);
      console.log(user.messages);
    });

  }

  playAudio(){
    let audio = new Audio();
    audio.src = "../../../assets/audio/ding-dong-chaturbate-token-sound.mp3";
    audio.load();
    audio.play();
  }

  sendMessage(msg: string) {
    //this.currentUser =  this.authenticationService.currentUser;

    console.log('currentuser: ' + this.currentUser)
    var message: Message = {
      sender: this.currentUser,
      text: msg,
      roomId: this.selectedUser._id,
      firstName: this.currentUser.firstName,
      lastName: this.currentUser.lastName
    }

    this.socket.emit("message", message);
    console.log('send message: ' + message.roomId);
    console.log("--------user " + this.currentUser._id )
  }
}

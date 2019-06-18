import { Component, OnInit } from '@angular/core';
import { Message } from '../../../models/message';
import { ChatService } from 'src/app/services/chat.service';
import {UserService} from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text : string ="";
  selectedUser: User;

  constructor(private chatService: ChatService, private userService:UserService) {}

  ngOnInit() {
    this.userService.selectedUserAsObservable.subscribe(data => {
      this.selectedUser = data;
    })

    this.userService.getSelectedUser();
    this.chatService.joinRoom();  
  }

  sendMessage(){
    if(this.text.length > 0){
      this.chatService.sendMessage(this.text);
      this.text = "";
    }
  }
}

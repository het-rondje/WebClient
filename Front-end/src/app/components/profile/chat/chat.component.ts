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
  userId;
  user;
  text : string ="";

  constructor(   private route: ActivatedRoute, private chatService: ChatService, private userService:UserService) { }


  ngOnInit() {
    //this.chatService.messages.subscribe(message => console.log(message))
    const id = this.route.snapshot.paramMap.get("id");
    this.userService.getUser(id.toString()).subscribe(data => {
      this.user = data;
 });

    this.chatService.joinRoom('5cff9cf3b15c9b3334118bc2');  
  }

  sendMessage(){
    if(this.text.length > 0){
      this.chatService.sendMessage(this.text);
      this.text = "";
    }
  }
}

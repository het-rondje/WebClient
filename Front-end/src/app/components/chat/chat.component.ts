import { Component, OnInit } from '@angular/core';
import { Message } from '../../models/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    //this.chatService.messages.subscribe(message => console.log(message))
  }

  sendMessage(){
    this.chatService.sendMessage("new message");
  }
}

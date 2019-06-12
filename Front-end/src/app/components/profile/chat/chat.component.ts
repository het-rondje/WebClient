import { Component, OnInit } from '@angular/core';
import { Message } from '../../../models/message';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  text : string ="";

  constructor(private chatService: ChatService) { }



  ngOnInit() {
    //this.chatService.messages.subscribe(message => console.log(message))
  }

  sendMessage(){
    if(this.text.length > 0){
      this.chatService.sendMessage(this.text);
    }
  }
}

import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../../models/message';
import { ChatService } from '../../../services/chat.service';
import { UserService } from '../../../services/user.service';

import { User } from '../../../models/user';
import SimpleBar from 'simplebar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  text: string = "";
  selectedUser: User;
  chatHeight: Number;
  simpleBar: SimpleBar;

  @ViewChild('elementRef', { static: true }) elementRef: ElementRef;


  constructor(private chatService: ChatService, private userService: UserService) { }

  ngOnInit() {

    this.userService.selectedUserAsObservable.subscribe(data => {
      this.selectedUser = data;
      setTimeout(() => {
        this.simpleBar.getScrollElement().scrollTop = this.simpleBar.getScrollElement().scrollHeight;
      }, 400);
    });
    this.simpleBar = new SimpleBar(this.elementRef.nativeElement);
    this.userService.getSelectedUser();
    this.chatService.joinRoom();
  }

  onResize() {
  }

  sendMessage() {
    if (this.text.length > 0) {
      this.chatService.sendMessage(this.text);
      this.text = "";
    }
    setTimeout(() => {
      this.simpleBar.getScrollElement().scrollTop = this.simpleBar.getScrollElement().scrollHeight;
    }, 100);
  }
}

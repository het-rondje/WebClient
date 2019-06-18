import { Component, OnInit, Input, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../../../models/message';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
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
        console.log('scrollTop: ' + this.simpleBar.getScrollElement().scrollTop);
        console.log('scrollHeight: ' + this.simpleBar.getScrollElement().scrollHeight);
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

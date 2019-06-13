import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
user;
userId;

  constructor(   private route: ActivatedRoute, private chatService: ChatService, private userService:UserService) { }


  ngOnInit() {
    //this.chatService.messages.subscribe(message => console.log(message))
    this.userId = this.route.params.subscribe((params) => {
      this.userId = params.id;
      this.userService.getUser(this.userId).subscribe((data) => {
        this.user = data;
 });
});

  }

}

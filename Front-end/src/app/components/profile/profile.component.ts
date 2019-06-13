import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  selectedUser: User;

  constructor(   private route: ActivatedRoute, private chatService: ChatService, private userService:UserService) { }


  ngOnInit() {
    this.userService.getSelectedUser();
    this.userService.selectedUserAsObservable.subscribe(data => {
      this.selectedUser = data;
      console.log(data);
    })
  }

}

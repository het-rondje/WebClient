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

  constructor(private userService:UserService) { }


  ngOnInit() {
    this.selectedUser = this.userService.getSelectedUser();
  }

}

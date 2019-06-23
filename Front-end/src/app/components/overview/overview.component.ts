import { Component, OnInit} from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
  users: User[] = [];

  // public users: { name: string, imgUrl: string, title: string, status: boolean }[] = [];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.users.subscribe(data => {
      this.users = data;
      console.log(data);
    })

    this.userService.getUsers();
  }

  setSelectedUser(user: User){
    console.log("set selected user: " + user)
    this.userService.setSelectedUser(user);
  }
}
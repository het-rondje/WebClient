import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
 users;

  // public users: { name: string, imgUrl: string, title: string, status: boolean }[] = [];

  constructor(private userService:UserService) { }

  ngOnInit() {
    
    this.userService.users.subscribe(data => {
      this.users = data;
      console.log(data);
    })

    this.userService.getUsers();
  }

  setSelectedPost(user: User){
    this.userService.setSelectedUser(user);
  }

}
import { Component, OnInit} from '@angular/core';
import { UserService } from 'src/app/services/user.service';

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
    // Dummy data
    // Status = Streaming or not
    // this.users.push({ name: "Jan", imgUrl: "", title: "Way too long Title to fit the image box....", status: true })
    // this.users.push({ name: "Henk", imgUrl: "", title: "Title", status: true })
    // this.users.push({ name: "Piet", imgUrl: "", title: "Title", status: false })
    // this.users.push({ name: "Jan", imgUrl: "", title: "Title", status: true })
    // this.users.push({ name: "Henk", imgUrl: "", title: "Title", status: false })
    // this.users.push({ name: "Piet", imgUrl: "", title: "Title", status: true })
    // this.users.push({ name: "Jan", imgUrl: "", title: "Title", status: true })
    // this.users.push({ name: "Henk", imgUrl: "", title: "Title", status: true })
    // this.users.push({ name: "Piet", imgUrl: "", title: "Title", status: false })
    this.userService.getUsers().subscribe(data => {
      this.users = data
    })
  }

}
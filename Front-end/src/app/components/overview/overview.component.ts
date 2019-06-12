import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit{
 

  public users: { name: string, imgUrl: string, title: string, status: boolean }[] = [];

  constructor() { }

  ngOnInit() {
    // Dummy data
    // Status = Streaming or not
    this.users.push({ name: "Jan", imgUrl: "", title: "Way too long Title to fit the image box....", status: true })
    this.users.push({ name: "Henk", imgUrl: "", title: "Title", status: true })
    this.users.push({ name: "Piet", imgUrl: "", title: "Title", status: false })
    this.users.push({ name: "Jan", imgUrl: "", title: "Title", status: true })
    this.users.push({ name: "Henk", imgUrl: "", title: "Title", status: false })
    this.users.push({ name: "Piet", imgUrl: "", title: "Title", status: true })
    this.users.push({ name: "Jan", imgUrl: "", title: "Title", status: true })
    this.users.push({ name: "Henk", imgUrl: "", title: "Title", status: true })
    this.users.push({ name: "Piet", imgUrl: "", title: "Title", status: false })
  }

}
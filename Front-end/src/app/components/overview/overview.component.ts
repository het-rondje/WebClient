import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  public users: { name: string, imgUrl: string, title: string }[] = [];

  constructor() { }

  ngOnInit() {
    //Dummy data
    this.users.push({ name: "Jan", imgUrl: "", title: "Way too long Title to fit the image box...." })
    this.users.push({ name: "Henk", imgUrl: "", title: "Title" })
    this.users.push({ name: "Piet", imgUrl: "", title: "Title" })
    this.users.push({ name: "Jan", imgUrl: "", title: "Title" })
    this.users.push({ name: "Henk", imgUrl: "", title: "Title" })
    this.users.push({ name: "Piet", imgUrl: "", title: "Title" })
    this.users.push({ name: "Jan", imgUrl: "", title: "Title" })
    this.users.push({ name: "Henk", imgUrl: "", title: "Title" })
    this.users.push({ name: "Piet", imgUrl: "", title: "Title" })
  }

}

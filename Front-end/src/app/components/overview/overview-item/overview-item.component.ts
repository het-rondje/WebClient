import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-overview-item',
  templateUrl: './overview-item.component.html',
  styleUrls: ['./overview-item.component.css']
})
export class OverviewItemComponent implements OnInit {

  @Input() user : {name: string, imgUrl : string, title: string, status: boolean};

  constructor() { }

  ngOnInit() {

   }

   //When user clicks on name or title from a live stream in the overview
   onSelected(){
    console.log("Clicked on user: " + this.user.name)
    //redirect to live stream page with this.user
   }

}

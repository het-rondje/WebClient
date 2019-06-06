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

}

import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { PublicUser } from 'src/app/models/publicUser';

@Component({
  selector: 'app-public-keys',
  templateUrl: './public-keys.component.html',
  styleUrls: ['./public-keys.component.css']
})
export class PublicKeysComponent implements OnInit {

  keys : PublicUser[] = [];

  constructor(private userService:UserService) { }

  ngOnInit() {
    this.userService.getPublicKeys().subscribe(data => {
      this.keys = data;
      console.log(data);
    })
  }
}

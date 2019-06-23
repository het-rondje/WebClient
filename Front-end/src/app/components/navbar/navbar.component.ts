import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../app/services/authentication.service';

declare function collapse(): any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {

  constructor(private auth: AuthenticationService) { }

  ngOnInit() {

  }

  collapseNav(){
    collapse();
  }

  logout(){
    this.auth.logout();
  }
}

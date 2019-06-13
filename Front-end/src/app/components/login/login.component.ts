import { Component, OnInit} from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private privateKey: String;
  constructor(private auth: AuthenticationService) { }

  ngOnInit() {
  }

  loginUser(){
  //Naar de service de key sturen.
  this.auth.login(this.privateKey);
  //Wat willen we terug?
  //token? var logged in true zetten?

  }

  test(){
    this.auth.login("");
  }

}

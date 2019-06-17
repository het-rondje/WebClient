import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private hardcodedKey: string = "-----BEGIN PRIVATE KEY-----MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQCnIlcAVr2KMii8n0ykvIcizGP/NBHIOhcYFwjoupt1QbrWgmuZ7TtAyeiKvG55widDno2uU7DZAMlnk8IXRrKg6uOqNPg5sR3hozllmg7fusVKGaRR5WtJ0ScuehtgXDjkqCQkgxLgJOMrCzxHQCXRJTBUp1Zvb94bCR00A9k7CP7jT0sh79yWHJPv50qgaATA7wuDmFs700FBxDj4iDB+jvr1Lh+N0dcrKLoBuMKS/yikoXHwBmkCUKbDPfIscZ2gc0wKaNyKFTSFugoXncU962bR3dp/NZsWj9+8UCTT7hYU/crID/szFm3otsqL5aJJ56l/NHPypZXzNDkijfPDAgMBAAECggEBAJnmqS6KsSZcYd6u4aigYd/NThdmHym9NB7etzl2/EfRKvb0SZkINpPGWPfH5AMCoZ1Glzh7oFFyxAM4sHU2iK5dHR9Sf3DAg7+Oyf+hCSlDlwBQ9FrlYxIqImZN0n+87DbCDeYBPJRh4z1zryH9E9Wu5P5OyOz8mg1TKy0GjjYo4tehLGNslTyV35+RnR9CdCRng9nT0rVMLr+C5Z578Yz61Q5s5RuLlC+qC8FqXipU4rf0B/sMhbdWQ6diKqpxbchLvNEwA19RqMMJdsxZtjpwzUXFiWjxtz7BjY33XK2SYEO8h79oF6KzdxEOdM9p3g/02snqJTpjWpMkdxAwTqECgYEA+ToM2mkdMC7/2VoHaUfmQsHMzUDNNLp/bsnqqJzzvKlTusjJ8SJINVZ7UZ6pk+NG2hnfpTH5mJZjELZ9Sog1w++h3RpSRG4K5hEnwhN02kFVcOcZEfVPTAV5lrVZEGRWiHSeVHEesjaTB+ICNnJgJV0UXvRAS6fDZlQQ0ZXzp0cCgYEAq60lK4Xc+GpkD/9cY+3/u42z1GhCxjj6wW7vPplNwzk07gqvIc+QA2sbwTfQsKkFggUngfvytrcdTh1J9AevLr7Gyh8Nh9+uCGP3jpiynw2XkuV6ycz+7dHXzo1q7YYUNg+yvp/oG/3f4o3RLddRInoBe+z1WUtoNtKSuUyrRaUCgYEA3DAyXODTXdeYSUJmG9jfEYnBVHH1GqnOnmYcQP3xxXPgOrzc1YLRQvZ2G0VPUw5Qca68TWnat7neKkzgYvH2dnaHjh2MI1MJo/vyIWApNA7W2toB50DQ3zxTERiFaJsNbJ+Dpt0OHqtiuWsvQ0VHtpsGvWGUUIMWepi5B0IxM08CgYEAndkLjiL886PO8S6YYoFYW7iEmk5q5xtI5EX90A7hAxk8Y4qLUIkqHxqCYHvTdDtUhyH6G3fuyLVBSqt/bdMK7e4XlYxLwpyVxb00x3X69mdm8HfzGE1WMJB63r4EjPR07OguLzuUDPi2u/YtWPra7NpFNw6+4CWHYrDmm121NMkCgYBA3zsb+pb2yZnWmyK7nQOft9cr384kpjyQmmzqNuWKS7EJCdzjhOrVJ+DF8nQRQ4disjqxJfQCILhXlvfkFynZN4sZnBvP1/XU2oX/hrHvNdlUcBpJbI568ke/AYZrDzMgbqb5jK1S1ButlRgd541xDSe0k4dxVHhcFdhUZlokIw==-----END PRIVATE KEY-----";
  private hardcodedId: string = "Io9px3dQP";

  private privateKey: string;
  private id: string;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }


  loginUser() {
    this.auth.login(this.privateKey, this.id).subscribe(response => {
      console.log(response)
      if (this.auth.isLoggedIn())
        this.router.navigateByUrl('/')
    })
  }

}

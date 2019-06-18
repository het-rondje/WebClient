import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private hardcodedKey: string = "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQChuJMuqiJ6SDAs\nh+btr1O/P9aMRNiCc0l5J485Efk4hbBL7Q19ujk5pBm9O3EDbqU3j9t07sxaxE9u\nQdd2a5QaZzUaD9MaPsu08ztdD3E18TDx2afQ/nLaBntj/hepoGhm39rppXADW6NX\n3fny8IlO1OPaCPTsTnVzS7VLJ9xO095x/JOKr960UGYa6xYzQeo9AMbJCQr57QLl\n4lRrLdA7LuuhKvDPwHjAOLvbjP57DQGkkBf8CchvbpbwOeUH11GbiyidjGqUXpvs\nNQpV28azt8hFdaymdtEwqBWf7tzPXyPJPwfsvXBQ/2Vi7cy/ecCHFv43cWfcwN09\nLs/Aym0RAgMBAAECggEAUsWMl1q+8MVX2sLoIAkXnRBIeFyYUBQ/q8HinTwkyZgr\nRoEa4ZnZxjXGcsMksbQE3e5ETZIXh/FoEi+i3tpq4CSo2iD1VD6FtqSzYosPz6MW\nAQL80IwbLpoYt3IKnGgcZ2L1wZZKQX26mbNkRcJ1FKMDx8nDydrSZGOAc+n/6VvY\nzA0hsJWQdd4Iw/lcu6Bl3ZkA3LdIqgU/eSdWAKeW3p40nfhTjGKja7pNw3FW90Iw\n26IjOiFpiZhpyesV39UiV5pLxgGP4OJ8ZJ2g/Ylu5+fBeg/XoSbxdgByI15tp6Fm\nBIn4n0I9dnoGgJtMLW1S+nht0cuhXsr6VAeziB3aAQKBgQDUL7vZqnVt7m0dunGZ\nLA/gQ8NbE65ba+d4PFlWlzS6yesgadFiQYId94S9HWbyWQq4DJphSBfvkvCgRmVN\nfaQ/3PQOZh0AywvW4goMi3uVu8/kTh3qDOs0zJY4dPsoFVxD7LHvjiy7XaYdU0WE\n1V+EUzGLlE9ntKfle+L8DQnlcQKBgQDDHTcejzCYS7nxaQOHz+xucPLiFyZGIbd4\nX3fTcpeDKI3iKBn+X8s4RuZ2M2ASAUJD/jiQOly2fJqiTe8+lPnOHJyOcR92Gd5d\nSC9zkuc2kVOmvmPzaAwo18lrg3apxjTtgg0RN2oHrv4ts/u9CYMOuai9nrAD+Cp7\nd8zD5c6xoQKBgQC1IlKQS+2W/LR1blXPVkfvQKmiNDjhnkmo4Iu7WbUPx5NKxkqS\nQC3dexD7h//73ntCBrA7X5nfUGbNy4prDliKlApbyFv181+V/rxpXSEQ/5VG5lCv\nHnwjRIrwgxxsaV+sNIDpaUtSX22RFyb/cE7r3UEsUF1AwH2bb5ijZlYOYQKBgECz\n3oR2zZGjgx0ISxBtpiUVtaW+MYYORk5Xsl/fX1kySKLX047ka3rVIDXQYap22me7\n1TwW7onhllH+cDkbpB9yo4QlBV7fwzrB5mJ4M86HsOrZtkGQnn+o13Wc2ewA+6pL\nd1PfQX0czdOQHQoaLmjiro97ITmfwU7CcpgADGQhAoGBAI0/xWxFArVYJDDCIye5\nIVQBZJOzSw/bfGJUSEYfu4kcq8cP9MOMrLSx4/StiNevRPXwzit/j89eWQEf/NX3\ni/JwfiUVdiGD1+LGc7sWAdI1+Jdh8FePa7QlSkFVDKL9yABl/iLW/vA5ZNfIhz7q\n6zKabWFS4COVsCB77GNE1Bll\n-----END PRIVATE KEY-----";

  private hardcodedId: string = "huYRrduZ9";

  private privateKey: string;
  private id: string;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }


  loginUser() {
    //this.auth.login(this.privateKey, this.id).subscribe(response => {
    this.auth.login(this.hardcodedKey, this.hardcodedId).subscribe(response => {

      console.log(response)
      if (this.auth.isLoggedIn())
        this.router.navigateByUrl('/')
    })
  }
}

import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private hardcodedKey: string = '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCkf37AmkyYbTCH\nLb4DqZJiMAk/+bB2f0W5DdiS6gW5ynRe6vBrCgWNV2ZlxR5LDuLon3UCflWzGKbV\nh3UR4ElfTp0vAT/uuiAEi+wqQ/rTIlLllPKcbiTU1Agd35zjuV6DuyDMuSU1Q8R2\nWL1MQc3TgugfY1xh2zPaXVGJiC1MNFvMiVQczxtMGtMTU3Qpa72u4IUyCFr0fj2r\nfTNVwpBOTzBhVojkNLKExiV2IJSJ3MhICqR3zdCT1sCvQXxqyUL/ypb7uy7ShOlu\n4ujPf5YOL6SCVa0yvLvzQ0vh+RDyFqy8XJxdSTjxlzPUrXZq1M0ZC7P2nFrimTP+\nFEYrec9zAgMBAAECggEAdc/eHuEjhHOHMvl+wi67aVkP9uLEEEoczGlvN+Elkqe9\n6pEG+RJnYZA8BR1FEeqqdoJlkhCbHjbEnd9y6AejZP/vsU+K01Y4QilYTfj79iT6\nC/U+QOzdshPdcE/LlIkZeO0Xk6fyTxCm7z+k662hVR/HUVufOXJ906HMGN0P3Cfn\nCSMwd/cmmDD21MvPopxGh/5fGchbNyODXC5ghdIr4Qxycxb/z+m56mD1CQ6BEfJB\n2xTUiSwJ2Wne4N7lCcB8aSTDJ1p8Xecn49QRHrznIN02CEaUaZBB67BJTITOO+Sy\nxoEYDHMHpWS04sJSYAHWWlA1KEVPxFOcnTtdJO9+EQKBgQDq579jHUGvd7eSDI2K\n9Uh94zbyyC5DY/q1BPRTeR57jomMV4h7mRguJgJno0xKnxPgJsK/km5eTv2SBKze\nXal6q4lCskPNOLiReBlafQj39TTjHuX55ECa370SeISYBxvg11gSBkwyYYSoA7Eq\nZ8gAeFP5LdzwRN4G29qQaUix6QKBgQCzRSanFUtsXiOs2w9uHOBZI652uNozfgrM\ndpgp+hFNKlJqEaltlLY4dYwTEkTEsqNnwo+UZ3HrWnbuIQ/Fm0FxyQFQCDnjOKQh\nqxhlQPBrcOSCNfCvxB2ctIBjb95SYBGvCoxZs9P2B28VrXYzgp2AJ59Nsv0aM9vz\nT1pZ0Rxg+wKBgQCgROG1k/5+42VhxiLETjnZei7BUocN/6bL3sd8NETx8/wwvoAm\nI/v1cIVvhGDHAOYkpw10e0nGGoqzF3GCfdDmGycZVFsiJ7L1vUU/EdQOqUQeObSa\n3HqfsEtl0MhWmXMR4pr6IUXXkeVaZLp5vjkc6PwSJJJ7c+EwOMxUfyDUEQKBgHEs\nsNA+s1UAwYj46u7bMA9WZWfyH17uraaTIFEv3AhZNZpc+BeEEN3n57yKhfufw2VY\nAQjxnYu1muuO18Qq1dAd08RQzSrTsVrIByi1LJLHvJsvrnloWEF7+qnMEBD1MXTO\nNfjTfHcQDmMjFUJDrWcgnIOTAhKutqcOa73UNBRNAoGAA/0rq0wAFAKvH2Q/0nyL\nE39cyuWxwZW13xdmUWtlSZfK6Xvv1EjOL5XK9RxLDN/s+txmcFFeZom4kvVMDVH0\n2lWHVMafWtUcJ9RE+TX+vZJ9LvqoanRXJxU25+woKIztMzHREVk3mqhZXOk2dz1r\npu9BwI7BnQLkbtqPjFQfAGQ=\n-----END PRIVATE KEY-----';

  private hardcodedId: string = "d_cT3EhFc";

  private privateKey: string;
  private id: string;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
  }


  loginUser() {
    //this.auth.login(this.privateKey, this.id).subscribe(response => {
    this.auth.login(this.privateKey, this.id).subscribe(response => {

      console.log(response)
      if (this.auth.isLoggedIn())
        this.router.navigateByUrl('/')
    })
  }
}

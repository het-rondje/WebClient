import { Component, OnInit } from '@angular/core';
import * as flvjs from '../../../../../node_modules/flv.js/dist/flv';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';
import { environment } from '../../../../environments/environment';


@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {
  selectedUser: User;
  viewerCount: any;

  constructor(private userService: UserService) { }

  ngOnInit() {
    //if (flvjs.isSupported()) {
    console.log("flvjs is supported...")
    var videoElement = document.getElementById('videoElement');
    var flvPlayer = flvjs.createPlayer({
      type: 'flv',
      isLive: true,
      //url: 'http://localhost:8000/live/mykey.flv'
      url: `${environment.streamURl}/` + this.userService.getSelectedUser()._id + '.flv'

    });
    flvPlayer.attachMediaElement(videoElement);
    flvPlayer.load();
    flvPlayer.play();
    //}

    //get viewers
    this.getViewers();
    setInterval(() => {
      this.getViewers();
    }, 5000);
  }

  getViewers() {
    this.selectedUser = this.userService.getSelectedUser();
    this.userService.getViewers(this.selectedUser._id).subscribe(data => {
      this.viewerCount = data['count'];
    })
  }

}

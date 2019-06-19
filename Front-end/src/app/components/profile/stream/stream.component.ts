import { Component, OnInit } from '@angular/core';
import * as flvjs from '../../../../../node_modules/flv.js/dist/flv';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stream',
  templateUrl: './stream.component.html',
  styleUrls: ['./stream.component.css']
})
export class StreamComponent implements OnInit {

  constructor(private userService:UserService) { }

  ngOnInit() {
    //if (flvjs.isSupported()) {
      console.log("flvjs is supported...")
      var videoElement = document.getElementById('videoElement');
      var flvPlayer = flvjs.createPlayer({
          type: 'flv',
          "isLive": true,
          //url: 'http://localhost:8000/live/mykey.flv'
          url: 'http://159.65.197.36:8000/live/' + this.userService.getSelectedUser()._id + '.flv'

      });
      flvPlayer.attachMediaElement(videoElement);
      flvPlayer.load();
      flvPlayer.play();
  //}

  }

}

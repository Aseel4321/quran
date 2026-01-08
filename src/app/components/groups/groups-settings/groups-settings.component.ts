import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-groups-settings',
  templateUrl: './groups-settings.component.html',
  styleUrls: ['./groups-settings.component.scss'],
})
export class GroupsSettingsComponent implements OnInit {constructor(private platform: Platform,private router: Router){}
 list = [
  'All','Unread','Read',
];


  ngOnInit() {  this.platform.ready().then(() => {
      const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    });}
 text: string = '';
}

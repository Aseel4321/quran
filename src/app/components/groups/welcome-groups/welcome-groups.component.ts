import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-welcome-groups',
  templateUrl: './welcome-groups.component.html',
  styleUrls: ['./welcome-groups.component.scss'],
})
export class WelcomeGroupsComponent implements OnInit {

  constructor(private platform: Platform,) { }

  ngOnInit() {  this.platform.ready().then(() => {
      const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    });}

}

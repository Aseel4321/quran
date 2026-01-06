import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-chats-groups',
  templateUrl: './chats-groups.component.html',
  styleUrls: ['./chats-groups.component.scss'],
})
export class ChatsGroupsComponent implements OnInit {

  constructor(private platform: Platform) { }

   ngOnInit(): void {
      this.platform.ready().then(() => {
        const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
        const width = this.platform.width();
        console.log('Screen Height:', height);
        console.log('Screen Width:', width);
      });
    }

}

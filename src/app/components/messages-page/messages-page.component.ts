import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit {

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

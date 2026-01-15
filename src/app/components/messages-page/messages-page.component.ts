import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit {
searchText: string = '';

  constructor(private platform: Platform,private service: MainServiceService ) { }

   ngOnInit(): void {
      this.platform.ready().then(() => {
        const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
        const width = this.platform.width();
        console.log('Screen Height:', height);
        console.log('Screen Width:', width);
      });
    }
messages(){console.log('fllowifng');
    this.service.messages(
 {
  "senderId":2601042138368739,
  "receiverId":2512150339932840,
  "conversationId": 2,
  "groupId": 0,
  "content": this.searchText,
  "messageType": "TEXT",
  "mediaUrl": "string",
  "mediaDuration": 0,
  "replyToMessageId": 0,
  "islamicGreetingKey": "string"
}
).subscribe((data:any)=>{console.log('onlidne');console.log(data);
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{ }
    });
  
   } 
}

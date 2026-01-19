import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';
import { ChatUser, User } from '../chats-search/chats-search.component';

@Component({
  selector: 'app-messages-page',
  templateUrl: './messages-page.component.html',
  styleUrls: ['./messages-page.component.scss'],
})
export class MessagesPageComponent implements OnInit {
searchText: string = '';
user_chat:ChatUser;
Messages:Message[];
 user:any;
  constructor(private platform: Platform,private service: MainServiceService ) { }
   messages_coversation(){console.log('conversations');console.log();const userData = localStorage.getItem('User');
    const user = JSON.parse(userData);
    this.user=user.id;
    this.service.messages_coversation(this.user_chat.id).subscribe((data:any)=>{ 
      console.log('mes');
      this.Messages=data.content.reverse();
      console.log(this.Messages);
      if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
        }else{console.error(error.error); }
    });


   }
   ngOnInit(): void {this.user_chat=this.service.user_chat;this.messages_coversation();
      this.platform.ready().then(() => {
        const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
        const width = this.platform.width();
        console.log('Screen Height:', height);
        console.log('Screen Width:', width);
      });
    }
messages(){console.log('fllowifng');const userData = localStorage.getItem('User');
   const user = JSON.parse(userData);
    this.service.messages(
 {
  "senderId":user.id,
  "receiverId":this.user_chat.otherUserId,
  "conversationId": this.user_chat.id,
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
export interface Message {
  id: number;
  conversationId: number;
  groupId: number;
  senderId: number;
  senderName: string;
  senderAvatar: string;
  messageType: 'TEXT' | 'IMAGE' | 'VIDEO' | 'AUDIO' | string;
  content: string;
  mediaUrl: string;
  mediaThumbnailUrl: string;
  mediaSize: number;
  mediaDuration: number;
  status: 'SENT' | 'DELIVERED' | 'READ' | string;
  isEdited: boolean;
  editedAt: string; // ISO Date
  replyToId: number;
  replyToContent: string;
  islamicGreetingKey: string;
  islamicGreetingArabic: string;
  islamicGreetingEnglish: string;
  createdAt: string; // ISO Date
}
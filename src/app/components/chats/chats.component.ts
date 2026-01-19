import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';
import { User } from '../chats-search/chats-search.component';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent  implements OnInit{constructor(private platform: Platform,private router: Router,private service: MainServiceService){}
Name:string='All';
unread_Count:any;

  ngOnInit(): void {
    this.unread_count();this.conversations();
    this.platform.ready().then(() => {
      const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    });
  }list_item:ChatListItem[] = [];
  list = [
  'All','Unread','Read',
];unread_count(){
   
    this.service.unread_count({}).subscribe((data:any)=>{ console.log('conv');console.log(data);
      this.unread_Count=data;
      if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{  console.error(error); 
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
       
  
        }else{  }
    });
  
   }connect(id){const userData = localStorage.getItem('User');
   const user = JSON.parse(userData);
    this.service.create_connection(
 user.id,id
).subscribe((data:any)=>{console.log('connect');console.log(data);
  this.service.user_chat=data;
 this.router.navigate(['/messages']);
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{ }
    });
  
   } 
   conversations(){ console.log('conversations');
    this.service.conversations().subscribe((data:any)=>{ 
      console.log('conversations');console.log(data);
      this.list_item=data;
      if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
        }else{console.error(error.error); }
    });
   }

name(name){
 this.Name=name;
}
image(name){
 if(name==this.Name){
    return 'assets/icon/Rectangle 172.png'
  }else{return 'assets/icon/Rectangle 173.png'}
}styleIcon(name) {
if(name==this.Name){
     return {
    width: '15.5vw',
    height: '2vh',
    cursor: 'pointer',
    userSelect: 'none',
    marginInlineStart: '3%'
  };
  }else{ return {
    width: '15.5vw',
    height: '1vh',
    cursor: 'pointer',
    userSelect: 'none',
    marginInlineStart: '3%'
  };}
 
}
cir(name){console.log(name);
  if(name==this.Name){
    return 'circley';
  }else{return 'circleg'}
}  
goBack() {
  this.router.navigate(['/home-page']);
}
}
export interface ChatListItem {
  id: number | string;
  otherUserId: number | string;
  otherUserName: string;
  otherUserAvatar: string | null;
  otherUserOnlineStatus: boolean | null;
  lastMessage: string;
  lastMessageTime: string;        // ISO 8601 string
  lastMessageSenderId: number | string;
  unreadCount: number;
  isMuted: boolean;
  isArchived: boolean;
  createdAt: string;              // ISO 8601 string
}
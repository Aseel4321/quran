import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Capacitor } from '@capacitor/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss'],
})
export class ChatsComponent  implements OnInit{constructor(private platform: Platform,private router: Router){}
Name:string='All';
  ngOnInit(): void {
    this.platform.ready().then(() => {
      const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    });
  }
  list = [
  'All','Unread','Read',
];
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

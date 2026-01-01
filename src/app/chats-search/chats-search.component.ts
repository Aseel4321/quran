import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-chats-search',
  templateUrl: './chats-search.component.html',
  styleUrls: ['./chats-search.component.scss'],
})
export class ChatsSearchComponent implements AfterViewInit{constructor(private platform: Platform,private router: Router){}
Name:string='All';  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;
  ngOnInit(): void {   
    this.platform.ready().then(() => {
      const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    });
  }
  ngAfterViewInit() {
 setTimeout(() => {
    this.searchInput.nativeElement.focus();
  }, 300);
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


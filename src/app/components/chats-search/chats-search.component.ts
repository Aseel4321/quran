import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { MainServiceService } from '../../main-service/main/main-service.service';

@Component({
  selector: 'app-chats-search',
  templateUrl: './chats-search.component.html',
  styleUrls: ['./chats-search.component.scss'],
})
export class ChatsSearchComponent implements AfterViewInit{constructor(private platform: Platform,private router: Router,private service: MainServiceService){}
Name:any;  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef;list_mutual:User[]=[];
  ngOnInit(): void {   this.mutual();
    this.platform.ready().then(() => {
      const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
    });
  }  search(event: any){const value = event.target.value;
      this.service.search(
    value
   
  ).subscribe((data:any)=>{ console.log('ASWWWWWd');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
   this.list=data;

      },(error: HttpErrorResponse)=>{
        console.log(error?.error?.arDescription)
          if(localStorage.getItem('lang')=='ar'){  
          console.error(error.error);
    
          }else{ }
      });
    
     } 
     mutual(){
      this.service.mutual(
  ).subscribe((data:any)=>{ console.log('ASWfffffffffffff');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
   this.list_mutual=data;
      },(error: HttpErrorResponse)=>{
        console.log(error?.error?.arDescription)
          if(localStorage.getItem('lang')=='ar'){  
          console.error(error.error);
    
          }else{ }
      });
    
     } 
     style(id){const nums = [1, 2, 3, 4, 5];

var t=this.list_mutual.find(item => item.id === id);

      if(t!=undefined){this.Name='follow';

      return 'circular-btn-f' ;
    }else{this.Name='unfollow';return 'circular-btn-uf' ;}
     }
  ngAfterViewInit() {
 setTimeout(() => {
    this.searchInput.nativeElement.focus();
  }, 300);
}
  list:User[]=[];
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

export interface User {
  id: number;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl: string | null;
  onlineStatus: 'ONLINE' | 'OFFLINE';
  lastActiveAt: string | null;
  followStatus: string | null;
  isMutualFollow: boolean;
}

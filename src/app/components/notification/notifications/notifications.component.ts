import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit{user:any;
  list=[];constructor(private platform: Platform,private cdr: ChangeDetectorRef,private router: Router,private servicea: AuthService,private service: MainServiceService ){}
  isScrollEnabled:boolean = false;
  isLoading:any=false;
  ngOnInit(): void { this.platform.ready().then(() => {      const height = this.platform.height(); 
    document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
  });
    const userData = localStorage.getItem('User');
     this.user = JSON.parse(userData); 
  this.notifications_get();
  }

  notifications_read(id){
   
    this.service.notifications_read(this.user.email,id).subscribe((data:any)=>{ console.log('ggggghhhhhhhhhhhhhhhhhhhhhhhhhdddddddddddddd');console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{    console.error(error.error); }
    });
  
   }notifications_delete(id,i){
   
    this.service.notifications_delete(this.user.email,id).subscribe((data:any)=>{ console.log('ggggdddd');
      console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 this.list.splice(i, 1);
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{    console.error(error.error); }
    });
  
   }
  notifications_get(){this.isLoading=true;
 const userData = localStorage.getItem('User');
     this.user = JSON.parse(userData);
    this.service.notifications_get({
  "email": this.user.email,
  "status": this.selectedSection,
  "language":localStorage.getItem('lang')=='ar'?'AR':'EN'
}).subscribe((data:any)=>{ this.isLoading=false;console.log('ASWWWWWd');console.log(data);if(localStorage.getItem('lang')=='ar'){ this.list=data}else{this.list=data}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{}
    });
  
   } 


selectedSection: string = 'UNREAD'; 

showSection(section: string) {
  this.selectedSection = section;
  if(localStorage.getItem('lang') === 'ar'){}else{}
  this.notifications_get();
}
goBack() {
  this.router.navigate(['/setting']);
}
title() {
  if (localStorage.getItem('lang') === 'ar') {
    return {
      'font-family': '"El Messiri", sans-serif',
      'font-weight': '600',
      'text-align': 'center',
      'margin-top': '1vh'
    };
  } else {
    return {
      'font-family': '"Lucida Console", Monaco, monospace', 'font-weight': '600',
      'text-align': 'center',
      'margin-top': '1vh'
    };
  }
}boxStyle: any = {};

setStyle(name) {
  if(this.selectedSection === name){return {
    'font-family': '"El Messiri", sans-serif',
    'border-radius': '20px',
    'margin-inline-start': '5%',
    'margin-inline-end': '5%','color':'#969468'
  };}else{return {
      'font-family': '"El Messiri", sans-serif',
    'border-radius': '20px',
    'margin-inline-start': '5%',
    'margin-inline-end': '5%',
  };}
  
}
}

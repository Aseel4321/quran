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
  ngOnInit(): void {
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
   
    this.service.notifications_delete(this.user.email,id).subscribe((data:any)=>{ console.log('ggggghhhhhhhhhhhhhhhhhhhhhhhhhdddddddddddddd');
      console.log(data);if(localStorage.getItem('lang')=='ar'){}else{}
 this.list.splice(i, 1);
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{    console.error(error.error); }
    });
  
   }
  notifications_get(){
 const userData = localStorage.getItem('User');
     this.user = JSON.parse(userData);
    this.service.notifications_get({
  "email": this.user.email,
  "status": this.selectedSection
}).subscribe((data:any)=>{ console.log('ASWWWWWd');console.log(data);if(localStorage.getItem('lang')=='ar'){this.list=data}else{this.list=data}
 
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);
  
        }else{ }
    });
  
   } 


selectedSection: string = 'UNREAD'; // الافتراضي

showSection(section: string) {
  this.selectedSection = section;this.notifications_get();
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
}
}

import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { MainServiceService } from 'src/app/main-service/main/main-service.service';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.scss'],
})
export class ReadComponent implements OnInit {list:any=[];
 constructor(private platform: Platform,private cdr: ChangeDetectorRef,private router: Router,private servicea: AuthService,private service: MainServiceService ){}

notifications_read(){
    this.service.notifications_read().subscribe((data:any)=>{ console.log('ddddddfffffffddddd');console.log(data);if(localStorage.getItem('lang')=='ar'){this.list=data;}else{this.list=data;}
    },(error: HttpErrorResponse)=>{
      console.log(error?.error?.arDescription)
        if(localStorage.getItem('lang')=='ar'){  
        console.error(error.error);}else{console.error(error.error); }
    });
   }
  ngOnInit() {this.notifications_read();}

}

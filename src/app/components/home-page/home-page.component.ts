import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
items=['aa','kk','yy','yyy','hhh','aa','kk',]
  constructor(private router: Router,private Service:AuthService) {}
list_time:any =[{
  name:"aseel",
  image:"assets/icon/sunny.png",
  time:'17:8',
},{
  name:"aseel",
  image:"assets/icon/sunrise.png",
  time:'17:8',
},{
  name:"aseel",
  image:"assets/icon/sun.png",
  time:'17:8',
},{
  name:"aseel",
  image:"assets/icon/cloudy.png",
  time:'17:8',
},{
  name:"aseel",
  image:"assets/icon/cloud.png",
  time:'17:8',
},{
  name:"aseel",
  image:"assets/icon/moon.png",
  time:'17:8',
}]

logout(){ console.log(localStorage.getItem('login'));
 localStorage.setItem('login','false'); 
 console.log(localStorage.getItem('login'));
 const user = JSON.parse(localStorage.getItem('user') || '{}');
 this.router.navigate(['/login']);

}

}

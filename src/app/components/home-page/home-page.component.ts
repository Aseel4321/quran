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
  constructor(private router: Router,private Service:AuthService,) {}
  list_card:any=[
    {name:"Quran Completion",title:'Last Read Al-Quran : ',number: 55,per:"4%",image:'assets/icon/islamic.png'},
    {name:"Morning Adhkar",title:'Evening Adhkar : ',number:6,per:"76%",image:'assets/icon/prayer.png'},
    {name:"Evening Adhkar",title:'Last Read Evening remembrance : ',number: 77,per:'23%',image:'assets/icon/exam.png'},
    {name:"Quran Memorization Test",title:'Last entry for Quran Memorization :',number:66,per:"90%",image:'assets/icon/prayer.png'}]
    list_type:any=[
    {name:"Tesbeeh",image:'assets/icon/beads.png'},
    {name:"Test",image:'assets/icon/exam.png'},
    {name:"AL-Hadith",image:'assets/icon/prayer.png'},
    {name:"Test",image:'assets/icon/teachings.png'},
  {name:"Al-Quran",image:'assets/icon/islamic.png'},
    {name:"Dua",image:'assets/icon/exam.png'},
    {name:"AL-Hadith",image:'assets/icon/praying.png'}
  ]
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
nav(num:any){
if(num==0){
 
}else if(num==1){this.router.navigate(['/rest-password']);}else if(num==2){this.router.navigate(['/rest-password']);}else if(num==3){this.router.navigate(['/setting']);}
}}

import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { GeolocationService } from 'src/app/main-service/geolocation/geolocation.service';
import { AlertController, Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit{
  items=['aa','kk','yy','yyy','hhh','aa','kk',]
  constructor(private http: HttpClient,private geolocation: Geolocation,private alertController: AlertController,private router: Router,private Service:AuthService,private geolocationService: GeolocationService) {}
  
  ngOnInit(): void {
//this.checkLocationEnabled();
  }
  latitude: number = 0;
  longitude: number = 0;
city:any;
city1:any;
country:any='';
bool:any=false;
 position:any;
  // للحصول على الموقع الحالي
async checkLocationEnabled() {this.position=undefined;
  try {console.log('position');
    this.position = await this.geolocation.getCurrentPosition();
   
    if (! this.position) {
      this.showAlert('Location access is denied or not enabled.');
      return;
    }

    console.log('Location is enabled');
    this.latitude =  this.position.coords.latitude;
    this.longitude =  this.position.coords.longitude;
    await this.getCityFromCoordinates(this.latitude, this.longitude);
  } catch (error) {
    // يتم الدخول هنا إذا كان الموقع مغلق أو تم رفض الإذن
    console.error('Error getting location', error);
   
  } if ( this.position instanceof Map){
     this.showAlert('Locati not enabledfdd.');
  }else{this.showAlert(this.position.Address.
state
);}
}





getCityFromCoordinates(latitude: number, longitude: number) {
  console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
  const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&lang=ar`;

  this.http.get(url).subscribe((response: any) => {
    if (response && response.address) { 
      console.log('Address:', response.address);
      this.city1=response.address.country;
      const city = response.address.city || response.address.town || response.address.village;
      const country = response.address.country;

      this.city = city ? `${city}, ${country}` : 'Location unknown';
      console.log('City:', this.city);
    } else {
      console.error('Error fetching address', response);
      this.city1 = 'Unable to fetch city info';
    }
  }, (error) => {
    console.error('Error with Nominatim API:', error);
    this.city = 'Unable to fetch city info';
  });
}

  // إظهار التنبيه في حالة عدم وجود الموقع
  async showAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Location Access',
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async presentAlert() {
    if(localStorage.getItem('lang')=='ar'){  const alert = await this.alertController.create({
    message: 'this.name',
    buttons: ['موافق']
  });await alert.present();}else{const alert = await this.alertController.create({
    //header: 'dddddd',
    message: 'this.name',
    buttons: ['ok']
  });await alert.present();}


  
}
 async requestLocationPermission() {
    const alert = await this.alertController.create({
      header: 'Location Permission Required',
      message: 'We need access to your location to provide accurate information.',
      buttons: [
        {
          text: 'Allow',
          handler: () => {
            this.getLocation();
          },
        },
        {
          text: 'Deny',
          handler: () => {
            console.log('User denied location access.');
            this.city = 'Location access denied by the user';
          },
        },
      ],
    });

    await alert.present();
  }

  // الحصول على الموقع عند السماح
  getLocation() {
    this.geolocation.getCurrentPosition()
      .then((position) => {
        console.log('Latitude:', position.coords.latitude);
        console.log('Longitude:', position.coords.longitude);
        this.city = 'Location enabled';
      })
      .catch((error) => {
        console.error('Error getting location', error);
        //this.showAlert('Error retrieving location');
        this.presentAlert() ;
      });
  }





  // لتتبع الموقع بشكل مستمر
  async startWatching() {
    const location = await this.geolocationService.watchPosition();
    console.log('Watching location updates...');
  }
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

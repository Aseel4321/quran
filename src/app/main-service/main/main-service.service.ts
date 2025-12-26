import { PlatformModule } from '@angular/cdk/platform';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {  constructor(private http: HttpClient,private platform: Platform) { }
unreadCount:any=0;
  adkar:any;
 date:any='';
 prayer:any;
 city_api:any;
 prayer_timee_9:any;
 prayer_timee_7:any;
 prayer_timee_6:any;
 time_now:any;
 text_name:string='AL-Hadith';
 timePeriodday: string = '';
 times:Model[]=[];name1:any;
 r='AR';
name='الدعاء';
remembrance(lang,name): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  const url = `https://margherita-circadian-minta.ngrok-free.dev/remembrance/get-categories?language=${lang}&category=${name}`;

  return this.http.get(url, { headers });
}
remembrance1(lang,name): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  const url = `https://margherita-circadian-minta.ngrok-free.dev/remembrance/get-remembrance?language=${lang}&categoryName=${name}`;

  return this.http.get(url, { headers });
}

//`https://margherita-circadian-minta.ngrok-free.dev/remembrance/get-categories?language=${this.r}&category=${this.r1}`
delete(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.delete(
    'https://margherita-circadian-minta.ngrok-free.dev/account/delete',  
    {
      headers: headers,
      body: data
    }
  );
}

update_profile(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/setting/update-profile',
    data,
    { headers: headers }
  );
}
notifications_get(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/notifications/get',  
  data ,
     { headers: headers }
      
  );
}

notifications_read(email,id): Observable<any> {//var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true'
  });

  return this.http.put(
        `https://margherita-circadian-minta.ngrok-free.dev/api/notifications/${id}/read?email=${email}`,  // استخدم البروكسي هنا
     { headers: headers }
      
    
  );
}notifications_delete(email,id): Observable<any> {//var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json','ngrok-skip-browser-warning': 'true'
  });

  return this.http.delete(
        `https://margherita-circadian-minta.ngrok-free.dev/api/notifications/${id}?email=${email}`,  // استخدم البروكسي هنا
     { headers: headers }
      
    
  );
}
notifications_count(email): Observable<any> {//var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
        `https://margherita-circadian-minta.ngrok-free.dev/api/notifications/user/${email}/count`,  // استخدم البروكسي هنا
     { headers: headers }
      
    
  );
}
notifications_user(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/api/notifications/user/aseelghaleb@gmail.com',  // استخدم البروكسي هنا
     { headers: headers }
      
    
  );
}notifications_create(data): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/notifications/create',  // استخدم البروكسي هنا
 data ,
     { headers: headers }
      
    
  );
}
add_calendar(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/calendar-alerts/add',  // استخدم البروكسي هنا
  
     data ,
     { headers: headers }
      
    
  );
}
range_calendar(): Observable<any> {//var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/user/d/range?startTime=2025-11-03T21%3A50%3A41.543Z&endTime=2025-11-03T21%3A50%3A41.543Z',  // استخدم البروكسي هنا
     { headers: headers }
      
    
  );
}Platform(){
const height = this.platform.height(); document.documentElement.style.setProperty('--screen-h', `${height}px`);
      const width = this.platform.width();
      console.log('Screen Height:', height);
      console.log('Screen Width:', width);
}
update_calendar(data: any): Observable<any> {var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.put(
  `https://margherita-circadian-minta.ngrok-free.dev/api/calendar-alerts/update?userEmail=aseelghaleb2088@gmail.com`,
   
     data , { headers: headers}
    
    
  );
}

prayer_times(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/feature/prayer-times',
    data,
    { headers: headers }
  );
}


}
interface Model {
  name: string;
  time: string;
  image: string
}
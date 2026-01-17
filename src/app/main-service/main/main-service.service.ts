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
 
}search(email): Observable<any> {//var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
        `https://margherita-circadian-minta.ngrok-free.dev/api/contacts/search?nameOrEmail=${email}`,  // استخدم البروكسي هنا
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
}follow(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/contacts/follow',
    data,                 // ✅ body الصحيح
    { headers }            // ✅ options
  );
}accept(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/contacts/follow/accept',
    data,                 // ✅ body الصحيح
    { headers }            // ✅ options
  );
}unfollow(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/contacts/unfollow',
    data,                
    { headers }           
  );
}
reject(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/contacts/follow/reject',
    data,                
    { headers }           
  );
}
notifications_count(email): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
        `https://margherita-circadian-minta.ngrok-free.dev/api/notifications/user/${email}/count`,  // استخدم البروكسي هنا
     { headers: headers }
  );
}mutual(): Observable<any> {const userData = localStorage.getItem('User');
     const user = JSON.parse(userData);
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
        `https://margherita-circadian-minta.ngrok-free.dev/api/contacts/mutual/2601042138368739`,  // استخدم البروكسي هنا
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
}following(data): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/api/contacts/following/2601042138368739',  // استخدم البروكسي هنا
 { headers: headers },
 
      
    
  );
}pending_sent(data): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/api/contacts/pending/sent/2601042138368739',  // استخدم البروكسي هنا
 { headers: headers },
 
      
    
  );
}create_coversation(data): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/api/chat/conversation/2601042138368739/2512150339932840',  // استخدم البروكسي هنا
 { headers: headers },
 
      
    
  );
}create_connection(userId,otherUserId): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
    `https://margherita-circadian-minta.ngrok-free.dev/api/chat/connect/${userId}/${otherUserId}`,  // استخدم البروكسي هنا
 { headers: headers },
 
      
    
  );
}unread_count(data): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/api/chat/unread-count/2601042138368739',  // استخدم البروكسي هنا
 { headers: headers },
 
      
    
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
online(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
        `https://margherita-circadian-minta.ngrok-free.dev/api/status/online/2601042138368739`,  // استخدم البروكسي هنا
     { headers: headers }
  );
}
offline(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
        `https://margherita-circadian-minta.ngrok-free.dev/api/status/offline/2601042138368739`,  // استخدم البروكسي هنا
     { headers: headers }
  );
}
heartbeat(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
        `https://margherita-circadian-minta.ngrok-free.dev/api/status/heartbeat/2601042138368739`,  // استخدم البروكسي هنا
     { headers: headers }
  );
}messages(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
    'https://margherita-circadian-minta.ngrok-free.dev/api/chat/message',
    data,
    { headers: headers }
  );
}messages_coversation(): Observable<any> {
  const headers = new HttpHeaders({   'ngrok-skip-browser-warning': 'true',
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.get(
    'https://margherita-circadian-minta.ngrok-free.dev/api/chat/messages/2',
    { headers: headers }
  );
}
read_message(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.post(
        `https://margherita-circadian-minta.ngrok-free.dev/api/chat/messages/read/2/2601042138368739`,  // استخدم البروكسي هنا
     { headers: headers }
  );
}conversations(): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true'
  });

  return this.http.get(
        `https://margherita-circadian-minta.ngrok-free.dev/api/chat/conversations/2601042138368739`,  // استخدم البروكسي هنا
     { headers: headers }
  );
}
}
interface Model {
  name: string;
  time: string;
  image: string
}
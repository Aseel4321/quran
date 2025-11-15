import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
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
 times:Model[]=[];
delete(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.delete(
    'https://api-project-6hj8.onrender.com/account/delete',  // استخدم البروكسي هنا
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
    'https://api-project-6hj8.onrender.com/setting/update-profile',
    data,
    { headers: headers }
  );
}Servers



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
    'https://api-project-6hj8.onrender.com/api/calendar-alerts/user/d/range?startTime=2025-11-03T21%3A50%3A41.543Z&endTime=2025-11-03T21%3A50%3A41.543Z',  // استخدم البروكسي هنا
     { headers: headers }
      
    
  );
}
update_calendar(data: any): Observable<any> {var email=localStorage.getItem('email');
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
//`https://api-project-6hj8.onrender.com/send-otp/send-to-email?email=${email}`
  return this.http.put(
  `https://api-project-6hj8.onrender.com/api/calendar-alerts/update?userEmail=aseelghaleb2088@gmail.com`,
   
     data , { headers: headers}
    
    
  );
}
//`https://api-project-6hj8.onrender.com/send-otp/send-to-email?email=${email}`;
prayer_times(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
    'https://api-project-6hj8.onrender.com/feature/prayer-times',
    data,
    { headers: headers }
  );
}

  constructor(private http: HttpClient) { }
}
interface Model {
  name: string;
  time: string;
  image: string
}
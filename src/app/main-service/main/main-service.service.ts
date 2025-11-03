import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
  adkar:any;
 date:any='';
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
}
add_calendar(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
    'https://api-project-6hj8.onrender.com/api/calendar-alerts/add',  // استخدم البروكسي هنا
  
     data ,
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

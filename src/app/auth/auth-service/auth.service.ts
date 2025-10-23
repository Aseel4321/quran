
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  email:string='';
  otp_number=0;
  profile_email:boolean=false;
//email:string='qazqaz20202020@gmail.com';
otp:string='5555';
  constructor( private http: HttpClient) { }
  get_data(collectionName: string): Observable<any> {
    return this.http.get('http://localhost:3000/${collectionName}'); 
  }
 post_accept(data:any):Observable<any>{
  return this.http.post('http://localhost:3000/users',data);
   }
 login(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
     'https://api-project-6hj8.onrender.com/account/login',  
    data,
    { headers }
  );
  
}title() {
  if (localStorage.getItem('lang') === 'ar') {
    return {
        'font-family': '"El Messiri", sans-serif',
      'font-weight': '500',
      'text-align': 'center',
      'margin-top': '5vw',
    'font-size': '7vw'
    };
  } else {
   return {
  'font-family': '"Jomolhari", serif',  // تغيير الخط هنا
  'font-weight': '500',
  'text-align': 'center',
  'margin-top': '5vw',
  'font-size': '7vw'
};

  }
}
 rest_password(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
     'https://api-project-6hj8.onrender.com/setting/change-password',  // <-- هنا استخدم البروكسي
    data,
    { headers }
  );
  
}
 signup(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
     'https://api-project-6hj8.onrender.com/account/register',  // <-- هنا استخدم البروكسي
    data,
    { headers }
  );
}
send_otp(email:string): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  const url = `https://api-project-6hj8.onrender.com/send-otp/send-to-email?email=${email}`;

  return this.http.post(url, null, { headers });
}
verity_otp(email:any,otp:any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });
  const url = `https://api-project-6hj8.onrender.com/verify-otp/verify-to-email?email=${email}&otp=${otp}`;

  return this.http.post(url, null, { headers });
}
 forgot_password(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.post(
     'https://api-project-6hj8.onrender.com/setting/forgot-password',  // <-- هنا استخدم البروكسي
    data,
    { headers }
  );
}
}

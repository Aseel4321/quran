import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
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

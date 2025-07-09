import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {
 
delete(data: any): Observable<any> {
  const headers = new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  return this.http.delete(
    'https://msaralquran-g5g9bxf3fnh3bzca.canadacentral-01.azurewebsites.net/account/delete',  // استخدم البروكسي هنا
    {
      headers: headers,
      body: data
    }
  );
}
  constructor(private http: HttpClient) { }
}

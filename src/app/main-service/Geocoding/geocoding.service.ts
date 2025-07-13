import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeocodingService {

  private apiUrl = 'https://nominatim.openstreetmap.org/reverse?format=json&addressdetails=1';

  constructor(private http: HttpClient) {}

  // تحويل الإحداثيات إلى عنوان
  async getAddressFromCoordinates(latitude: number, longitude: number) {
    const url = `${this.apiUrl}&lat=${latitude}&lon=${longitude}`;
    try {
      const response = await this.http.get<any>(url).toPromise();
      if (response && response.address) {
        return response.address;
      } else {
        throw new Error('No address found');
      }
    } catch (error) {
      console.error('Error getting address:', error);
      throw error;
    }
  }
}

import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import { async } from 'rxjs';
import { GeocodingService } from '../Geocoding/geocoding.service';
@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private geocodingService: GeocodingService) {}

 // الحصول على الموقع الحالي مع تحويل الإحداثيات إلى عنوان
  async getCurrentLocationWithAddress() {
    try {
      const position = await Geolocation.getCurrentPosition();
      const coords = position.coords;
      const address = await this.geocodingService.getAddressFromCoordinates(coords.latitude, coords.longitude);
      return { coords, address };
    } catch (error) {
      console.error('Error getting location or address:', error);
      throw error;
    }
  }

  async watchPosition() {
    const location = await Geolocation.watchPosition({}, (position, err) => {
      if (err) {
        console.error('Error watching position:', err);
        return;
      }
      console.log('Updated position:', position);
    });

    return location;
  }
}

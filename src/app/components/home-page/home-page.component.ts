import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth-service/auth.service';
import { Geolocation } from '@capacitor/geolocation';// ✅ مكتبة Capacitor فقط
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  items = ['aa', 'kk', 'yy', 'yyy', 'hhh', 'aa', 'kk'];
  latitude: number = 0;
  longitude: number = 0;
  city: any;
  city1: any;
  country: any = '';
  bool: any = false;
  position: any;
  city11: any = '';
  list_card: any[] = [
    { name: "Quran Completion", title: 'Last Read Al-Quran : ', number: 55, per: "4%", image: 'assets/icon/islamic.png' },
    { name: "Morning Adhkar", title: 'Evening Adhkar : ', number: 6, per: "76%", image: 'assets/icon/prayer.png' },
    { name: "Evening Adhkar", title: 'Last Read Evening remembrance : ', number: 77, per: '23%', image: 'assets/icon/exam.png' },
    { name: "Quran Memorization Test", title: 'Last entry for Quran Memorization :', number: 66, per: "90%", image: 'assets/icon/prayer.png' }
  ];
  list_type: any[] = [
    { name: "Tesbeeh", image: 'assets/icon/beads.png' },
    { name: "Test", image: 'assets/icon/exam.png' },
    { name: "AL-Hadith", image: 'assets/icon/prayer.png' },
    { name: "Test", image: 'assets/icon/teachings.png' },
    { name: "Al-Quran", image: 'assets/icon/islamic.png' },
    { name: "Dua", image: 'assets/icon/exam.png' },
    { name: "AL-Hadith", image: 'assets/icon/praying.png' }
  ];
  list_time: any[] = [
    { name: "aseel", image: "assets/icon/sunny.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/sunrise.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/sun.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/cloudy.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/cloud.png", time: '17:8' },
    { name: "aseel", image: "assets/icon/moon.png", time: '17:8' }
  ];

  constructor(
    private http: HttpClient,
    private alertController: AlertController,
    private router: Router,
    private Service: AuthService,
  ) {}

  ngOnInit(): void {  
   this.checkLocationEnabled();
  }
  async checkLocationEnabledt() {
  // 1. عرض رسالة توضيحية أولاً
  const infoAlert = await this.alertController.create({
    header: 'طلب إذن الموقع',
    message: 'يحتاج التطبيق للوصول إلى موقعك لتحديد المدينة الحالية.',
    buttons: [
      {
        text: 'موافق',
        handler: async () => {
          // بعد الضغط على موافق نطلب الصلاحية
          const permission = await Geolocation.requestPermissions();

          if (permission.location !== 'granted') {
            await this.showAlertno('تم رفض إذن الموقع. يرجى تفعيله من إعدادات التطبيق.');
            return;
          }

        try {
            this.position = await Geolocation.getCurrentPosition();
            this.latitude = this.position.coords.latitude;
            this.longitude = this.position.coords.longitude;

            console.log('📍 Location:', this.latitude, this.longitude);

            await this.getCityFromCoordinates(this.latitude, this.longitude);
          } catch (error: any) {
            console.error('❌ Error getting location', error);
            await this.showAlertno('تعذر الحصول على الموقع. تحقق من GPS أو الأذونات.');
          }
        },
      },
    ],
  });

  await infoAlert.present();
}

async checkLocationEnabledغ() {
  // 1. نعرض تنبيه للمستخدم لطلب الموافقة المبدئية
  const confirmAlert = await this.alertController.create({
    header: 'طلب إذن الموقع',
    message: 'يحتاج التطبيق للوصول إلى موقعك لتحديد المدينة الحالية. هل تسمح بذلك؟',
    buttons: [
      {
        text: 'لا',
        role: 'cancel',
        handler: () => {
          console.log('❌ المستخدم رفض السماح');
        },
      },
      {
        text: 'نعم',
        handler: async () => {
          // 2. إذا وافق، نطلب الصلاحية من النظام
          const permission = await Geolocation.requestPermissions();

          if (permission.location !== 'granted') {
            await this.showAlertno('تم رفض إذن الموقع. يرجى تفعيله من إعدادات التطبيق.');
            return;
          }

          // 3. نحصل على الموقع
          try {
            this.position = await Geolocation.getCurrentPosition();
            this.latitude = this.position.coords.latitude;
            this.longitude = this.position.coords.longitude;

            console.log('📍 Location:', this.latitude, this.longitude);

            await this.getCityFromCoordinates(this.latitude, this.longitude);
          } catch (error: any) {
            console.error('❌ Error getting location', error);
            await this.showAlertno('تعذر الحصول على الموقع. تحقق من GPS أو الأذونات.');
          }
        },
      },
    ],
  });

  await confirmAlert.present();
}
  // ✅ الحصول على الموقع وتحديد المدينة
  async checkLocationEnabled() {


  
    try {
      console.log('🔍 Requesting current position...');

      this.position = await Geolocation.getCurrentPosition();

      this.latitude = this.position.coords.latitude;
      this.longitude = this.position.coords.longitude;

      console.log('📍 Location:', this.latitude, this.longitude);
const alert = await this.alertController.create({
    header: 'الموقع',
   message:'موافق على الوصول',
    buttons: [
      {
        text: 'OK',
        handler: async () => {
    await this.getCityFromCoordinates(this.latitude, this.longitude);
          console.log('تم الضغط على OK');

          // مثال: استدعاء دالة أخرى
          this.afterOkPressed();
        }
      },    {
        text: 'no',
        handler: async () => {
    
          console.log('تم الضغط على OK');

          // مثال: استدعاء دالة أخرى
          this.afterOkPressed();
        }
      }
    ],
  });

  await alert.present();
     
 
    } catch (error: any) {
      console.error('❌ Error getting location', error);
      await this.showAlertno('تعذر الحصول على الموقع. تحقق من الأذونات.');
    }
  }
async checkLocationEnabled1() {
    try {
      console.log('🔍 Requesting current position...');
      this.position = await Geolocation.getCurrentPosition();

      this.latitude = this.position.coords.latitude;
      this.longitude = this.position.coords.longitude;

      console.log('📍 Location:', this.latitude, this.longitude);
const alert = await this.alertController.create({
  header: 'الموقع',
  message: 'هل توافق على السماح للتطبيق بالوصول إلى موقعك؟',
  buttons: [
    {
      text: 'لا',
      handler: async () => {
        console.log('❌ المستخدم رفض الوصول');
        await this.showAlertno('تم رفض إذن الوصول للموقع.');
      }
    },
    {
      text: 'مفوافق',
      handler: async () => {
        console.log('✅ المستخدم وافق على الوصول');
        await this.getCityFromCoordinates(this.latitude, this.longitude);
        this.afterOkPressed();
      }
    }
  ]
});

await alert.present();




      

    } catch (error: any) {
      console.error('❌ Error getting location', error);
      await this.showAlertno('تعذر الحصول على الموقع. تحقق من الأذونات.');
    }
  }
  // ✅ استرجاع اسم المدينة من الإحداثيات
  getCityFromCoordinates(latitude: number, longitude: number) {
    console.log(`📡 Reverse geocoding...`);
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&lang=ar`;

    this.http.get(url).subscribe((response: any) => {
      if (response && response.address) {
        console.log('📍 Address:', response.address);
        this.city1 = response.address.country;
        const city = response.address.state;
        const country = response.address.country;
        this.city = city ? `${city}, ${country}` : 'Location unknown';
      } else {
        this.city1 = 'Unable to fetch city info';
      }
    }, (error) => {
      console.error('🌐 Error with reverse geocoding API:', error);
      this.city = 'Unable to fetch city info';
    });
  }

  // ✅ عرض تنبيه
async showAlertyes(message: string) {
  const alert = await this.alertController.create({
    header: 'الموقع',
    message: message,
    buttons: [
      {
        text: 'OK',
        handler: () => {
         
          console.log('تم الضغط على OK');

          // مثال: استدعاء دالة أخرى
          this.afterOkPressed();
        }
      }
    ],
  });

  await alert.present();
}

async showAlertno(message: string) {
  const alert = await this.alertController.create({
    header: 'الموقع',
    message: message,
    buttons: [
      {
        text: 'OK',
        handler: () => {
         this.checkLocationEnabled1();
          console.log('تم الضغط على OK');

          // مثال: استدعاء دالة أخرى
          this.afterOkPressed();
        }
      }
    ],
  });

  await alert.present();
}
afterOkPressed() {
  // كود إضافي يتم تنفيذه بعد الضغط على OK
  console.log('تم تنفيذ الكود بعد الضغط على OK');
}


  // ✅ تنبيه بسيط بلغة المستخدم
  async presentAlert() {
    const message = 'this.name';
    const buttons = [localStorage.getItem('lang') === 'ar' ? 'موافق' : 'ok'];
    const alert = await this.alertController.create({
      message,
      buttons
    });
    await alert.present();
  }

  // ✅ طلب إذن الوصول للموقع
  async requestLocationPermission() {
    const alert = await this.alertController.create({
      header: 'الصلاحيات المطلوبة',
      message: 'نحتاج للوصول إلى موقعك لتوفير معلومات دقيقة.',
      buttons: [
        {
          text: 'السماح',
          handler: () => {
            this.getLocation();
          },
        },
        {
          text: 'رفض',
          handler: () => {
            console.log('تم رفض الوصول إلى الموقع من قبل المستخدم.');
            this.city = 'تم رفض الوصول إلى الموقع';
          },
        },
      ],
    });

    await alert.present();
  }

  // ✅ استخدام Capacitor لتحديد الموقع
  async getLocation() {
    try {
      const position = await Geolocation.getCurrentPosition();
      console.log('Latitude:', position.coords.latitude);
      console.log('Longitude:', position.coords.longitude);
      this.city = 'تم الحصول على الموقع';
    } catch (error) {
      console.error('❌ Error getting location', error);
      this.city = 'حدث خطأ في تحديد الموقع';
      this.presentAlert();
    }
  }

  // ✅ تسجيل الخروج
  logout() {
    localStorage.setItem('login', 'false');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.router.navigate(['/login']);
  }

  // ✅ تنقل بين الصفحات
  nav(num: any) {
    if (num === 1 || num === 2) {
      this.router.navigate(['/rest-password']);
    } else if (num === 3) {
      this.router.navigate(['/setting']);
    }
  }
}
